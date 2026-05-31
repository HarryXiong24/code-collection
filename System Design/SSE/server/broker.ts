import type { ServerResponse } from "node:http";
import { buildComment, buildFrame, type SSEFrame } from "./frame.js";

// ---------------------------------------------------------------------------
// SSEBroker — pub/sub hub for SSE clients.
//
// Features beyond the textbook version:
//   1. Replay buffer  — ring buffer of recent events; on reconnect the client
//                       sends Last-Event-ID and we replay everything after it.
//   2. Topic filter   — each client subscribes to a subset of event names.
//   3. Backpressure   — per-client bounded queue; slow clients are dropped
//                       instead of stalling the broadcast loop.
//   4. Keepalive      — periodic SSE comments stop idle-proxy disconnects.
// ---------------------------------------------------------------------------

export interface BrokerOptions {
  /** Max events kept for Last-Event-ID replay. */
  replayBufferSize?: number;
  /** Max pending writes per client before we drop the slowest. */
  perClientQueueLimit?: number;
  /** Heartbeat (SSE comment) interval in ms. 0 to disable. */
  heartbeatMs?: number;
  /** Initial `retry:` hint sent to every client on connect. */
  retryHintMs?: number;
}

interface Client {
  id: string;
  res: ServerResponse;
  topics: Set<string> | null; // null => receive everything
  pending: number;            // bytes queued but not yet flushed
}

interface StoredEvent {
  id: number;
  frame: SSEFrame;
  serialized: string;
}

export class SSEBroker {
  private readonly clients = new Map<string, Client>();
  private readonly replay: StoredEvent[] = [];
  private clientCounter = 0;
  private eventCounter = 0;
  private heartbeatTimer?: NodeJS.Timeout;
  private closed = false;

  private readonly replayBufferSize: number;
  private readonly perClientQueueLimit: number;
  private readonly heartbeatMs: number;
  private readonly retryHintMs: number;

  constructor(opts: BrokerOptions = {}) {
    this.replayBufferSize = opts.replayBufferSize ?? 256;
    this.perClientQueueLimit = opts.perClientQueueLimit ?? 64 * 1024; // 64 KiB
    this.heartbeatMs = opts.heartbeatMs ?? 15_000;
    this.retryHintMs = opts.retryHintMs ?? 3_000;

    if (this.heartbeatMs > 0) {
      this.heartbeatTimer = setInterval(
        () => this.sendKeepalive(),
        this.heartbeatMs,
      );
      this.heartbeatTimer.unref();
    }
  }

  get size(): number {
    return this.clients.size;
  }

  /** Register a new client and (optionally) replay missed events. */
  addClient(
    res: ServerResponse,
    opts: { lastEventId?: string; topics?: string[] } = {},
  ): Client {
    const id = `client-${++this.clientCounter}`;
    const topics =
      opts.topics && opts.topics.length > 0 ? new Set(opts.topics) : null;

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no", // disable buffering on nginx
      "Access-Control-Allow-Origin": "*",
    });

    const client: Client = { id, res, topics, pending: 0 };
    this.clients.set(id, client);

    // Track outstanding write bytes for naive backpressure accounting.
    res.on("drain", () => {
      client.pending = 0;
    });
    res.on("close", () => this.removeClient(client, "close"));
    res.on("error", () => this.removeClient(client, "error"));

    // First frame: retry hint + a welcome comment.
    res.write(buildComment(`connected as ${id}`));
    res.write(buildFrame({ event: "open", data: { clientId: id }, retry: this.retryHintMs }));

    // Last-Event-ID replay.
    const lastId = parseInt(opts.lastEventId ?? "", 10);
    if (Number.isFinite(lastId)) {
      for (const ev of this.replay) {
        if (ev.id > lastId && this.acceptedBy(client, ev.frame.event)) {
          this.writeRaw(client, ev.serialized);
        }
      }
    }

    console.log(
      `[broker] + ${id}  topics=${topics ? [...topics].join(",") : "*"}  total=${this.clients.size}`,
    );
    return client;
  }

  /** Broadcast an event to all matching clients and add it to the replay buffer. */
  broadcast(frame: Omit<SSEFrame, "id"> & { id?: number }): void {
    if (this.closed) return;

    const id = frame.id ?? ++this.eventCounter;
    const full: SSEFrame = { ...frame, id };
    const serialized = buildFrame(full);

    // Store in the ring buffer for replay.
    this.replay.push({ id, frame: full, serialized });
    if (this.replay.length > this.replayBufferSize) {
      this.replay.shift();
    }

    for (const client of this.clients.values()) {
      if (!this.acceptedBy(client, full.event)) continue;
      this.writeRaw(client, serialized);
    }
  }

  /** Close all client streams. Idempotent. */
  shutdown(reason = "server shutting down"): void {
    if (this.closed) return;
    this.closed = true;
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);

    for (const client of this.clients.values()) {
      try {
        client.res.write(buildFrame({ event: "close", data: { reason } }));
        client.res.end();
      } catch {
        /* ignore */
      }
    }
    this.clients.clear();
  }

  // ---- internals --------------------------------------------------------

  private acceptedBy(client: Client, eventName?: string): boolean {
    if (!client.topics) return true;
    return client.topics.has(eventName ?? "message");
  }

  private writeRaw(client: Client, payload: string): void {
    if (client.pending > this.perClientQueueLimit) {
      // Slow client — drop it rather than balloon memory or stall siblings.
      console.warn(`[broker] dropping slow client ${client.id}`);
      this.removeClient(client, "slow");
      return;
    }
    const ok = client.res.write(payload);
    if (!ok) client.pending += Buffer.byteLength(payload);
  }

  private sendKeepalive(): void {
    const comment = buildComment("ping");
    for (const client of this.clients.values()) {
      this.writeRaw(client, comment);
    }
  }

  private removeClient(client: Client, reason: string): void {
    if (!this.clients.delete(client.id)) return;
    try {
      client.res.end();
    } catch {
      /* ignore */
    }
    console.log(`[broker] - ${client.id}  reason=${reason}  total=${this.clients.size}`);
  }
}
