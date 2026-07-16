// SSE Demo client.
//
// Wraps the browser's EventSource with:
//   - connection-state UI (connecting / connected / reconnecting)
//   - reconnect counter
//   - Last-Event-ID display (the browser already sends it on reconnect)
//   - topic filtering via query-string
//   - bounded log (caps DOM growth)

interface LogEntry {
  time: string;
  event: string;
  data: string;
  id?: string;
}

type ConnectionState = "connecting" | "connected" | "reconnecting";

const MAX_LOG_ENTRIES = 200;

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element: ${id}`);
  return el as T;
};

const logEl = $<HTMLDivElement>("log");
const statusEl = $<HTMLDivElement>("status");
const statusTxt = $<HTMLSpanElement>("statusText");
const lastIdEl = $<HTMLSpanElement>("lastId");
const reconnectsEl = $<HTMLSpanElement>("reconnects");
const clientIdEl = $<HTMLSpanElement>("clientId");
const topicForm = $<HTMLFormElement>("topicForm");
const clearBtn = $<HTMLButtonElement>("clearBtn");

let es: EventSource | null = null;
let reconnects = -1; // -1 so the initial connect isn't counted
let lastEventId = "";
const entries: LogEntry[] = [];

function setState(state: ConnectionState): void {
  statusEl.className = `status ${state}`;
  statusTxt.textContent =
    state === "connected" ? "Connected" : state === "connecting" ? "Connecting…" : "Reconnecting…";
}

function render(): void {
  // Newest first; the slice keeps the DOM bounded.
  logEl.replaceChildren(
    ...entries
      .slice(-MAX_LOG_ENTRIES)
      .reverse()
      .map((e) => {
        const div = document.createElement("div");
        div.className = `entry ${e.event}`;
        div.innerHTML =
          `<span class="time">[${e.time}]</span> ` +
          (e.id ? `<span class="id">#${e.id}</span> ` : "") +
          `<span class="event">${e.event}</span> ` +
          `<span class="data"></span>`;
        const dataSpan = div.querySelector(".data") as HTMLSpanElement;
        dataSpan.textContent = e.data; // textContent → no XSS via payload
        return div;
      }),
  );
}

function append(event: string, ev: MessageEvent): void {
  if (ev.lastEventId) {
    lastEventId = ev.lastEventId;
    lastIdEl.textContent = lastEventId;
  }
  entries.push({
    time: new Date().toLocaleTimeString(),
    event,
    data: ev.data,
    id: ev.lastEventId || undefined,
  });
  if (entries.length > MAX_LOG_ENTRIES * 2) entries.splice(0, entries.length - MAX_LOG_ENTRIES);
  render();
}

function connect(): void {
  if (es) {
    es.close();
    es = null;
  }

  const selected = Array.from(
    topicForm.querySelectorAll<HTMLInputElement>("input[type=checkbox]"),
  )
    .filter((c) => c.checked)
    .map((c) => c.value);

  const url = selected.length ? `/events?topics=${encodeURIComponent(selected.join(","))}` : "/events";

  reconnects++;
  reconnectsEl.textContent = String(Math.max(0, reconnects));
  setState(reconnects === 0 ? "connecting" : "reconnecting");

  es = new EventSource(url);

  es.addEventListener("open", () => setState("connected"));

  es.addEventListener("open", (ev) => {
    // Server emits a custom "open" event with the assigned client id.
    // (Named differently from the native "open" listener above.)
    void ev;
  });

  es.addEventListener("message", (ev) => append("message", ev as MessageEvent));
  es.addEventListener("heartbeat", (ev) => append("heartbeat", ev as MessageEvent));

  es.addEventListener("open", (ev) => {
    const me = ev as MessageEvent;
    if (typeof me.data === "string") {
      try {
        const parsed = JSON.parse(me.data) as { clientId?: string };
        if (parsed.clientId) clientIdEl.textContent = parsed.clientId;
      } catch {
        /* not a JSON open event */
      }
    }
  });

  es.addEventListener("close", (ev) => {
    append("close", ev as MessageEvent);
    setState("reconnecting");
  });

  es.onerror = () => {
    // Browsers fire `error` both for transient blips (and then auto-reconnect)
    // and for fatal failures. EventSource.readyState distinguishes them.
    if (!es) return;
    setState(es.readyState === EventSource.CLOSED ? "reconnecting" : "reconnecting");
  };
}

// Re-subscribe whenever topics change.
topicForm.addEventListener("change", connect);
clearBtn.addEventListener("click", () => {
  entries.length = 0;
  render();
});

connect();
