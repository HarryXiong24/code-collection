// WebSocket demo client.
//
// The browser's WebSocket is a thinner abstraction than EventSource: it will
// NOT reconnect for you, it will NOT replay missed messages, and anything you
// send while it is down is lost. Everything EventSource hands you for free has
// to be built here:
//
//   - reconnect with exponential backoff + jitter
//   - an outbound queue so sends during an outage survive
//   - re-joining the room after reconnect (the server has no memory of us)
//
// Ping/pong is the exception — the browser answers server PINGs in its own
// networking layer, so a heartbeat is invisible to page JS.

interface ChatMessage {
  id: number;
  from: string;
  text: string;
  ts: number;
}

type ServerMessage =
  | { type: "welcome"; id: string; rooms: string[] }
  | { type: "joined"; room: string; name: string; history: ChatMessage[] }
  | { type: "chat"; room: string; message: ChatMessage }
  | { type: "presence"; room: string; members: string[] }
  | { type: "typing"; room: string; from: string; state: boolean }
  | { type: "system"; room: string; text: string }
  | { type: "error"; message: string };

type ConnectionState = "connecting" | "connected" | "reconnecting" | "offline";

const BASE_BACKOFF_MS = 500;
const MAX_BACKOFF_MS = 10_000;
const MAX_ENTRIES = 300;
const TYPING_THROTTLE_MS = 1_000;

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element: ${id}`);
  return el as T;
};

const logEl = $<HTMLDivElement>("log");
const statusEl = $<HTMLDivElement>("status");
const statusTxt = $<HTMLSpanElement>("statusText");
const clientIdEl = $<HTMLSpanElement>("clientId");
const reconnectsEl = $<HTMLSpanElement>("reconnects");
const queuedEl = $<HTMLSpanElement>("queued");
const roomsEl = $<HTMLDivElement>("rooms");
const presenceEl = $<HTMLSpanElement>("presence");
const typingEl = $<HTMLDivElement>("typing");
const composer = $<HTMLFormElement>("composer");
const input = $<HTMLInputElement>("input");
const nameInput = $<HTMLInputElement>("nameInput");
const disconnectBtn = $<HTMLButtonElement>("disconnectBtn");

let ws: WebSocket | null = null;
let state: ConnectionState = "connecting";
let attempt = 0;
let reconnects = 0;
let manuallyClosed = false;
let reconnectTimer: number | undefined;

let room = "general";
// Not `name` — that collides with the `window.name` global.
let userName = `guest-${Math.floor(Math.random() * 1000)}`;
let rooms: string[] = ["general"];

/** Sends attempted while the socket is down, flushed on reconnect. */
const outbox: string[] = [];
const typingNow = new Set<string>();
let lastTypingSent = 0;

const entries: Array<{ kind: string; html: string }> = [];

// ---- rendering ----------------------------------------------------------

function setState(next: ConnectionState): void {
  state = next;
  statusEl.className = `status ${next}`;
  statusTxt.textContent =
    next === "connected"
      ? "Connected"
      : next === "connecting"
        ? "Connecting…"
        : next === "offline"
          ? "Offline"
          : "Reconnecting…";
  disconnectBtn.textContent = next === "offline" ? "Connect" : "Disconnect";
  queuedEl.textContent = String(outbox.length);
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function push(kind: string, html: string): void {
  entries.push({ kind, html });
  if (entries.length > MAX_ENTRIES) entries.splice(0, entries.length - MAX_ENTRIES);
  render();
}

function render(): void {
  const atBottom = logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 40;
  logEl.replaceChildren(
    ...entries.map((e) => {
      const div = document.createElement("div");
      div.className = `entry ${e.kind}`;
      div.innerHTML = e.html;
      return div;
    }),
  );
  // Only auto-scroll if the user hasn't scrolled up to read history.
  if (atBottom) logEl.scrollTop = logEl.scrollHeight;
}

function addChat(msg: ChatMessage): void {
  const time = new Date(msg.ts).toLocaleTimeString();
  const mine = msg.from === userName;
  push(
    `chat${mine ? " mine" : ""}`,
    `<span class="time">[${time}]</span> <span class="from">${escapeHtml(msg.from)}</span> ` +
      `<span class="text">${escapeHtml(msg.text)}</span>`,
  );
}

function addSystem(text: string): void {
  push("system", `<span class="text">· ${escapeHtml(text)}</span>`);
}

function renderRooms(): void {
  roomsEl.replaceChildren(
    ...rooms.map((r) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `room${r === room ? " active" : ""}`;
      btn.textContent = `#${r}`;
      btn.addEventListener("click", () => switchRoom(r));
      return btn;
    }),
  );
}

function renderTyping(): void {
  const names = [...typingNow];
  typingEl.textContent =
    names.length === 0
      ? ""
      : names.length === 1
        ? `${names[0]} is typing…`
        : `${names.slice(0, 2).join(", ")}${names.length > 2 ? " and others" : ""} are typing…`;
}

// ---- transport ----------------------------------------------------------

function send(msg: unknown): void {
  const raw = JSON.stringify(msg);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(raw);
    return;
  }
  outbox.push(raw);
  queuedEl.textContent = String(outbox.length);
}

function flushOutbox(): void {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  while (outbox.length > 0) {
    ws.send(outbox.shift()!);
  }
  queuedEl.textContent = "0";
}

function connect(): void {
  manuallyClosed = false;
  if (ws) {
    ws.onclose = null; // don't let the old socket schedule a reconnect
    ws.close();
  }

  setState(attempt === 0 ? "connecting" : "reconnecting");

  // Same origin, ws:// or wss:// to match http:/https:.
  const scheme = location.protocol === "https:" ? "wss:" : "ws:";
  ws = new WebSocket(`${scheme}//${location.host}/ws`);

  ws.onopen = () => {
    attempt = 0;
    setState("connected");
    // The server holds no session for us — re-announce who and where we are.
    send({ type: "join", room, name: userName });
    flushOutbox();
  };

  ws.onmessage = (ev: MessageEvent<string>) => {
    let msg: ServerMessage;
    try {
      msg = JSON.parse(ev.data) as ServerMessage;
    } catch {
      return;
    }
    handle(msg);
  };

  ws.onclose = (ev: CloseEvent) => {
    if (manuallyClosed) {
      setState("offline");
      return;
    }
    // 1000 = we asked to close; anything else is unexpected.
    addSystem(`connection lost (code ${ev.code}${ev.reason ? `: ${ev.reason}` : ""})`);
    scheduleReconnect();
  };

  ws.onerror = () => {
    // `error` is always followed by `close`, so reconnect is handled there.
  };
}

function scheduleReconnect(): void {
  setState("reconnecting");
  reconnects++;
  reconnectsEl.textContent = String(reconnects);

  // Exponential backoff with jitter — without the jitter, every client
  // knocked off by a restart comes back in the same instant.
  const backoff = Math.min(BASE_BACKOFF_MS * 2 ** attempt, MAX_BACKOFF_MS);
  const delay = backoff / 2 + Math.random() * (backoff / 2);
  attempt++;

  addSystem(`reconnecting in ${(delay / 1000).toFixed(1)}s…`);
  window.clearTimeout(reconnectTimer);
  reconnectTimer = window.setTimeout(connect, delay);
}

function handle(msg: ServerMessage): void {
  switch (msg.type) {
    case "welcome":
      clientIdEl.textContent = msg.id;
      rooms = msg.rooms;
      renderRooms();
      return;

    case "joined":
      entries.length = 0;
      typingNow.clear();
      renderTyping();
      addSystem(`joined #${msg.room} as ${msg.name}`);
      for (const m of msg.history) addChat(m);
      if (msg.history.length === 0) addSystem("no messages yet — say something");
      return;

    case "chat":
      typingNow.delete(msg.message.from);
      renderTyping();
      addChat(msg.message);
      return;

    case "presence":
      presenceEl.textContent = `${msg.members.length} online: ${msg.members.join(", ")}`;
      return;

    case "typing":
      if (msg.state) typingNow.add(msg.from);
      else typingNow.delete(msg.from);
      renderTyping();
      return;

    case "system":
      addSystem(msg.text);
      return;

    case "error":
      addSystem(`error: ${msg.message}`);
      return;
  }
}

// ---- UI wiring ----------------------------------------------------------

function switchRoom(next: string): void {
  if (next === room) return;
  room = next;
  renderRooms();
  send({ type: "join", room, name: userName });
}

composer.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  send({ type: "chat", text });
  send({ type: "typing", state: false });
  input.value = "";
});

input.addEventListener("input", () => {
  if (input.value.length === 0) {
    send({ type: "typing", state: false });
    lastTypingSent = 0;
    return;
  }
  // Throttle: one signal per second, not one per keystroke.
  const now = Date.now();
  if (now - lastTypingSent < TYPING_THROTTLE_MS) return;
  lastTypingSent = now;
  send({ type: "typing", state: true });
});

nameInput.addEventListener("change", () => {
  const next = nameInput.value.trim();
  if (!next || next === userName) return;
  userName = next;
  send({ type: "join", room, name: userName });
});

disconnectBtn.addEventListener("click", () => {
  if (state === "offline") {
    attempt = 0;
    connect();
    return;
  }
  manuallyClosed = true;
  window.clearTimeout(reconnectTimer);
  ws?.close(1000, "user disconnected");
  setState("offline");
  addSystem("disconnected — press Connect to come back");
});

nameInput.value = userName;
renderRooms();
connect();
