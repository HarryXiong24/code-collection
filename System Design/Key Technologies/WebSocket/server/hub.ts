import type { WSConnection } from "./connection.js";
import type { ClientMessage, ServerMessage, ChatMessage } from "./protocol.js";
import { parseClientMessage } from "./protocol.js";

// ---------------------------------------------------------------------------
// Hub — the application layer: rooms, presence, and history.
//
// The SSE demo's broker fans one global stream out to many readers. A Hub is
// what that becomes once the channel is bidirectional: clients don't just
// subscribe, they *publish*, so the server must track who is where and route
// each message to a room rather than to everyone.
//
// Per-room history is the direct analogue of the SSE replay buffer, but note
// the difference: SSE replay is driven by Last-Event-ID because the browser
// reconnects on its own. Here the client reconnects manually, so history is
// simply handed over on join.
// ---------------------------------------------------------------------------

export interface HubOptions {
  /** Rooms clients may join. */
  rooms?: string[];
  /** Messages retained per room and replayed on join. */
  historySize?: number;
  /** A typing indicator auto-expires after this long without a refresh. */
  typingTimeoutMs?: number;
}

interface Member {
  conn: WSConnection;
  name: string;
  room: string;
  typingTimer?: NodeJS.Timeout;
}

export class Hub {
  private readonly members = new Map<string, Member>();
  private readonly rooms = new Map<string, Set<string>>();
  private readonly history = new Map<string, ChatMessage[]>();
  private readonly historySize: number;
  private readonly typingTimeoutMs: number;
  private messageCounter = 0;

  constructor(opts: HubOptions = {}) {
    this.historySize = opts.historySize ?? 50;
    this.typingTimeoutMs = opts.typingTimeoutMs ?? 3_000;
    for (const room of opts.rooms ?? ["general", "random"]) {
      this.rooms.set(room, new Set());
      this.history.set(room, []);
    }
  }

  get roomNames(): string[] {
    return [...this.rooms.keys()];
  }

  get size(): number {
    return this.members.size;
  }

  /** Attach a freshly upgraded connection. */
  accept(conn: WSConnection): void {
    conn.onMessage = (data) => this.handleMessage(conn, data);
    conn.onClose = () => this.handleClose(conn);

    const welcome: ServerMessage = {
      type: "welcome",
      id: conn.id,
      rooms: this.roomNames,
    };
    conn.sendJSON(welcome);
  }

  /** Broadcast to every member of a room, optionally skipping one connection. */
  private broadcast(room: string, msg: ServerMessage, exceptId?: string): void {
    const ids = this.rooms.get(room);
    if (!ids) return;
    const payload = JSON.stringify(msg);
    for (const id of ids) {
      if (id === exceptId) continue;
      this.members.get(id)?.conn.send(payload);
    }
  }

  private handleMessage(conn: WSConnection, raw: string): void {
    let msg: ClientMessage;
    try {
      msg = parseClientMessage(raw);
    } catch (err) {
      const error: ServerMessage = {
        type: "error",
        message: err instanceof Error ? err.message : "bad message",
      };
      conn.sendJSON(error);
      return;
    }

    switch (msg.type) {
      case "join":
        this.join(conn, msg.room, msg.name);
        return;
      case "chat":
        this.chat(conn, msg.text);
        return;
      case "typing":
        this.typing(conn, msg.state);
        return;
      case "leave":
        this.leave(conn, "left");
        return;
    }
  }

  private join(conn: WSConnection, room: string, name: string): void {
    if (!this.rooms.has(room)) {
      conn.sendJSON({ type: "error", message: `no such room: ${room}` } satisfies ServerMessage);
      return;
    }

    // Joining while already in a room is a move, not a second membership.
    const existing = this.members.get(conn.id);
    if (existing) {
      if (existing.room === room && existing.name === name) return;
      this.leave(conn, "moved");
    }

    const member: Member = { conn, name, room };
    this.members.set(conn.id, member);
    this.rooms.get(room)!.add(conn.id);

    conn.sendJSON({
      type: "joined",
      room,
      name,
      history: this.history.get(room) ?? [],
    } satisfies ServerMessage);

    this.broadcast(room, { type: "system", room, text: `${name} joined` }, conn.id);
    this.sendPresence(room);
    console.log(`[hub] ${conn.id} (${name}) joined #${room} — ${this.members.size} online`);
  }

  private chat(conn: WSConnection, text: string): void {
    const member = this.members.get(conn.id);
    if (!member) {
      conn.sendJSON({ type: "error", message: "join a room first" } satisfies ServerMessage);
      return;
    }

    this.clearTyping(member);

    const message: ChatMessage = {
      id: ++this.messageCounter,
      from: member.name,
      text,
      ts: Date.now(),
    };

    const log = this.history.get(member.room)!;
    log.push(message);
    if (log.length > this.historySize) log.shift();

    this.broadcast(member.room, { type: "chat", room: member.room, message });
  }

  private typing(conn: WSConnection, state: boolean): void {
    const member = this.members.get(conn.id);
    if (!member) return;

    if (member.typingTimer) clearTimeout(member.typingTimer);

    if (state) {
      // Auto-expire: a client that goes silent mid-word (or crashes) must not
      // leave a permanent "… is typing" on everyone else's screen.
      member.typingTimer = setTimeout(() => {
        member.typingTimer = undefined;
        this.broadcast(member.room, {
          type: "typing",
          room: member.room,
          from: member.name,
          state: false,
        }, conn.id);
      }, this.typingTimeoutMs);
      member.typingTimer.unref();
    } else {
      member.typingTimer = undefined;
    }

    this.broadcast(member.room, {
      type: "typing",
      room: member.room,
      from: member.name,
      state,
    }, conn.id);
  }

  private clearTyping(member: Member): void {
    if (!member.typingTimer) return;
    clearTimeout(member.typingTimer);
    member.typingTimer = undefined;
    this.broadcast(member.room, {
      type: "typing",
      room: member.room,
      from: member.name,
      state: false,
    }, member.conn.id);
  }

  private leave(conn: WSConnection, why: string): void {
    const member = this.members.get(conn.id);
    if (!member) return;

    if (member.typingTimer) clearTimeout(member.typingTimer);
    this.rooms.get(member.room)?.delete(conn.id);
    this.members.delete(conn.id);

    this.broadcast(member.room, {
      type: "system",
      room: member.room,
      text: `${member.name} ${why === "moved" ? "left" : "disconnected"}`,
    });
    this.sendPresence(member.room);
  }

  private handleClose(conn: WSConnection): void {
    this.leave(conn, "disconnected");
    console.log(`[hub] ${conn.id} disconnected — ${this.members.size} online`);
  }

  private sendPresence(room: string): void {
    const ids = this.rooms.get(room);
    if (!ids) return;
    const names = [...ids].map((id) => this.members.get(id)?.name ?? "?").sort();
    this.broadcast(room, { type: "presence", room, members: names });
  }

  /** Close every connection with a going-away code. */
  shutdown(reason = "server shutting down"): void {
    for (const member of this.members.values()) {
      member.conn.close(1001, reason);
    }
    this.members.clear();
    for (const ids of this.rooms.values()) ids.clear();
  }
}
