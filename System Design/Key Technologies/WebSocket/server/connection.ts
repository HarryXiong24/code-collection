import type { Duplex } from "node:stream";
import {
  FrameDecoder,
  OPCODE,
  ProtocolError,
  decodeClose,
  encodeClose,
  encodeFrame,
  isControlOpcode,
  utf8Decode,
  type Frame,
  type Opcode,
} from "./frame.js";

// ---------------------------------------------------------------------------
// WSConnection — one upgraded socket.
//
// Owns everything below the application's message stream:
//   1. Fragmentation  — reassembles CONTINUATION chains into one message.
//   2. Control frames — auto-replies to PING, tracks PONG for liveness.
//   3. Close handshake — RFC 6455 §7: a close is an *exchange*, not a hangup.
//   4. Liveness       — a peer that stops answering PINGs is torn down; a
//                       half-open TCP connection is otherwise invisible.
//   5. Backpressure   — a client that stops reading is dropped rather than
//                       letting the kernel buffer grow without bound.
// ---------------------------------------------------------------------------

export interface ConnectionOptions {
  id: string;
  /** Ping interval in ms. A peer that misses two in a row is dropped. 0 disables. */
  heartbeatMs?: number;
  /** Reject and close on any frame larger than this. */
  maxPayloadBytes?: number;
  /** Drop the peer once this many bytes are queued unsent. */
  maxBufferedBytes?: number;
}

type MessageHandler = (data: string, conn: WSConnection) => void;
type CloseHandler = (code: number, reason: string, conn: WSConnection) => void;

export class WSConnection {
  readonly id: string;
  /** Application-owned scratch space (the Hub stores nickname/room here). */
  readonly ctx = new Map<string, unknown>();

  onMessage: MessageHandler = () => {};
  onClose: CloseHandler = () => {};

  private readonly socket: Duplex;
  private readonly decoder: FrameDecoder;
  private readonly heartbeatMs: number;
  private readonly maxBufferedBytes: number;

  // Fragmentation state: set by an unfinished TEXT/BINARY, cleared on FIN.
  private fragmentOpcode: Opcode | null = null;
  private fragments: Buffer[] = [];
  private fragmentBytes = 0;

  private heartbeatTimer?: NodeJS.Timeout;
  private awaitingPong = false;
  private lastRttMs = 0;

  private closeSent = false;
  private closed = false;

  constructor(socket: Duplex, opts: ConnectionOptions) {
    this.id = opts.id;
    this.socket = socket;
    this.heartbeatMs = opts.heartbeatMs ?? 30_000;
    this.maxBufferedBytes = opts.maxBufferedBytes ?? 1024 * 1024;
    this.decoder = new FrameDecoder(opts.maxPayloadBytes ?? 1024 * 1024);

    // Nagle's algorithm batches small writes to save on packet overhead, which
    // is exactly wrong for a latency-sensitive frame stream. The 'upgrade'
    // event types the socket as a bare Duplex, but for an http.Server it is
    // always a net.Socket — hence the guard rather than a cast.
    if ("setNoDelay" in socket) {
      (socket as Duplex & { setNoDelay(noDelay: boolean): void }).setNoDelay(true);
    }

    socket.on("data", (chunk: Buffer) => this.handleData(chunk));
    socket.on("error", () => this.destroy(1006, "socket error"));
    socket.on("close", () => this.destroy(1006, "socket closed"));

    if (this.heartbeatMs > 0) {
      this.heartbeatTimer = setInterval(() => this.heartbeat(), this.heartbeatMs);
      this.heartbeatTimer.unref();
    }
  }

  get isOpen(): boolean {
    return !this.closed && !this.closeSent;
  }

  get rttMs(): number {
    return this.lastRttMs;
  }

  send(data: string): void {
    if (!this.isOpen) return;
    this.write(encodeFrame(OPCODE.TEXT, Buffer.from(data, "utf8")));
  }

  sendJSON(value: unknown): void {
    this.send(JSON.stringify(value));
  }

  /** Begin the closing handshake and wait for the peer's echo. */
  close(code = 1000, reason = ""): void {
    if (this.closeSent || this.closed) return;
    this.closeSent = true;
    this.write(encodeClose(code, reason));
    // If the peer never echoes, stop waiting.
    setTimeout(() => this.destroy(code, reason), 5_000).unref();
  }

  // ---- internals --------------------------------------------------------

  private write(buf: Buffer): void {
    if (this.closed) return;
    const ok = this.socket.write(buf);
    // writableLength is what Node has queued but not yet handed to the kernel.
    if (!ok && this.socket.writableLength > this.maxBufferedBytes) {
      console.warn(`[ws] dropping slow client ${this.id} (${this.socket.writableLength}B queued)`);
      this.destroy(1008, "client too slow");
    }
  }

  private handleData(chunk: Buffer): void {
    if (this.closed) return;
    let frames: Frame[];
    try {
      frames = this.decoder.push(chunk);
    } catch (err) {
      this.fail(err);
      return;
    }
    for (const frame of frames) {
      try {
        this.handleFrame(frame);
      } catch (err) {
        this.fail(err);
        return;
      }
      if (this.closed) return;
    }
  }

  private handleFrame(frame: Frame): void {
    if (isControlOpcode(frame.opcode)) {
      this.handleControlFrame(frame);
      return;
    }

    // --- data frame: TEXT / BINARY / CONTINUATION ---
    if (frame.opcode === OPCODE.CONTINUATION) {
      if (this.fragmentOpcode === null) {
        throw new ProtocolError(1002, "continuation frame with nothing to continue");
      }
    } else {
      if (this.fragmentOpcode !== null) {
        throw new ProtocolError(1002, "new data frame while a message is still fragmented");
      }
      this.fragmentOpcode = frame.opcode;
    }

    this.fragments.push(frame.payload);
    this.fragmentBytes += frame.payload.length;

    if (!frame.fin) return;

    const opcode = this.fragmentOpcode;
    const message = Buffer.concat(this.fragments, this.fragmentBytes);
    this.fragmentOpcode = null;
    this.fragments = [];
    this.fragmentBytes = 0;

    if (opcode === OPCODE.BINARY) {
      // This demo's application protocol is JSON-over-TEXT.
      this.close(1003, "binary messages are not supported");
      return;
    }

    let text: string;
    try {
      text = utf8Decode(message);
    } catch {
      throw new ProtocolError(1007, "text message is not valid UTF-8");
    }
    this.onMessage(text, this);
  }

  private handleControlFrame(frame: Frame): void {
    switch (frame.opcode) {
      case OPCODE.PING:
        // Must echo the exact application data back (§5.5.3).
        this.write(encodeFrame(OPCODE.PONG, frame.payload));
        return;

      case OPCODE.PONG: {
        this.awaitingPong = false;
        const sentAt = Number(frame.payload.toString("utf8"));
        if (Number.isFinite(sentAt)) this.lastRttMs = Date.now() - sentAt;
        return;
      }

      case OPCODE.CLOSE: {
        const { code, reason } = decodeClose(frame.payload);
        if (!this.closeSent) {
          // Peer initiated: echo the code back, then we may close the socket.
          this.closeSent = true;
          this.write(encodeClose(code === 1005 ? 1000 : code, reason));
        }
        this.destroy(code, reason);
        return;
      }
    }
  }

  private heartbeat(): void {
    if (!this.isOpen) return;
    if (this.awaitingPong) {
      // Missed the previous round — the peer is gone or wedged.
      this.destroy(1006, "pong timeout");
      return;
    }
    this.awaitingPong = true;
    // Timestamp as the ping body; the pong echoes it back, giving us RTT free.
    this.write(encodeFrame(OPCODE.PING, Buffer.from(String(Date.now()), "utf8")));
  }

  private fail(err: unknown): void {
    const code = err instanceof ProtocolError ? err.code : 1011;
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[ws] ${this.id} protocol error: ${message}`);
    if (!this.closeSent) {
      this.closeSent = true;
      this.write(encodeClose(code, message.slice(0, 123)));
    }
    this.destroy(code, message);
  }

  /** Tear down immediately. Idempotent — every path funnels through here. */
  private destroy(code: number, reason: string): void {
    if (this.closed) return;
    this.closed = true;
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.socket.end();
    // Give the close frame a moment to flush before killing the socket.
    setTimeout(() => this.socket.destroy(), 200).unref();
    this.onClose(code, reason, this);
  }
}
