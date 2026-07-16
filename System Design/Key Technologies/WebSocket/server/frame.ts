import { randomBytes } from "node:crypto";

// ---------------------------------------------------------------------------
// RFC 6455 §5 — frame codec.
//
// Every WebSocket frame looks like this (bit offsets across the top):
//
//    0                   1                   2                   3
//    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
//   +-+-+-+-+-------+-+-------------+-------------------------------+
//   |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
//   |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
//   |N|V|V|V|       |S|             |   (if payload len==126/127)   |
//   | |1|2|3|       |K|             |                               |
//   +-+-+-+-+-------+-+-------------+-------------------------------+
//   |     Masking-key (0 or 4 bytes, present iff MASK==1)           |
//   +---------------------------------------------------------------+
//   |     Payload Data (XOR'd byte-wise with the masking key)       |
//   +---------------------------------------------------------------+
//
// Two asymmetries are easy to get wrong and are enforced below:
//   - Client→server frames MUST be masked; server→client frames MUST NOT be.
//   - Control frames (close/ping/pong) MUST be ≤125 bytes and MUST NOT be
//     fragmented — they may be injected *between* fragments of a data message.
// ---------------------------------------------------------------------------

export const OPCODE = {
  CONTINUATION: 0x0,
  TEXT: 0x1,
  BINARY: 0x2,
  CLOSE: 0x8,
  PING: 0x9,
  PONG: 0xa,
} as const;

export type Opcode = (typeof OPCODE)[keyof typeof OPCODE];

const KNOWN_OPCODES = new Set<number>(Object.values(OPCODE));

export interface Frame {
  fin: boolean;
  opcode: Opcode;
  payload: Buffer;
}

/** Control opcodes have the high bit of the 4-bit opcode set. */
export function isControlOpcode(opcode: number): boolean {
  return (opcode & 0x8) !== 0;
}

/**
 * A protocol violation. `code` is the WebSocket close code to send back
 * before tearing the connection down (RFC 6455 §7.4.1).
 */
export class ProtocolError extends Error {
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message);
    this.name = "ProtocolError";
  }
}

export function encodeFrame(
  opcode: Opcode,
  payload: Buffer = Buffer.alloc(0),
  opts: { fin?: boolean; mask?: boolean } = {},
): Buffer {
  const fin = opts.fin ?? true;
  const mask = opts.mask ?? false;
  const len = payload.length;

  // 2-byte prefix + optional extended length + optional 4-byte masking key.
  const extendedLenBytes = len > 0xffff ? 8 : len > 125 ? 2 : 0;
  const buf = Buffer.allocUnsafe(2 + extendedLenBytes + (mask ? 4 : 0) + len);

  buf[0] = (fin ? 0x80 : 0x00) | opcode;

  const maskBit = mask ? 0x80 : 0x00;
  let off = 2;
  if (extendedLenBytes === 0) {
    buf[1] = maskBit | len;
  } else if (extendedLenBytes === 2) {
    buf[1] = maskBit | 126;
    buf.writeUInt16BE(len, 2);
    off = 4;
  } else {
    buf[1] = maskBit | 127;
    buf.writeBigUInt64BE(BigInt(len), 2);
    off = 10;
  }

  if (!mask) {
    payload.copy(buf, off);
    return buf;
  }

  // Masking exists to defeat cache-poisoning attacks against intermediaries,
  // so the key must be unpredictable — hence randomBytes, not Math.random.
  const key = randomBytes(4);
  key.copy(buf, off);
  off += 4;
  for (let i = 0; i < len; i++) {
    buf[off + i] = payload[i]! ^ key[i & 3]!;
  }
  return buf;
}

export function encodeClose(code: number, reason = ""): Buffer {
  const reasonBuf = Buffer.from(reason, "utf8");
  const payload = Buffer.allocUnsafe(2 + reasonBuf.length);
  payload.writeUInt16BE(code, 0);
  reasonBuf.copy(payload, 2);
  return encodeFrame(OPCODE.CLOSE, payload);
}

/** Close codes a peer is allowed to put on the wire (RFC 6455 §7.4.1). */
function isValidCloseCode(code: number): boolean {
  // 1004 is reserved; 1005/1006/1015 are "no code received"/"abnormal"/"TLS
  // failure" sentinels that only ever exist locally, never on the wire.
  if (code >= 3000 && code <= 4999) return true;
  return (code >= 1000 && code <= 1003) || (code >= 1007 && code <= 1011);
}

export function decodeClose(payload: Buffer): { code: number; reason: string } {
  if (payload.length === 0) return { code: 1005, reason: "" };
  if (payload.length === 1) {
    throw new ProtocolError(1002, "close payload of exactly 1 byte");
  }
  const code = payload.readUInt16BE(0);
  if (!isValidCloseCode(code)) {
    throw new ProtocolError(1002, `invalid close code ${code}`);
  }
  let reason: string;
  try {
    reason = utf8Decode(payload.subarray(2));
  } catch {
    throw new ProtocolError(1007, "close reason is not valid UTF-8");
  }
  return { code, reason };
}

const strictUtf8 = new TextDecoder("utf-8", { fatal: true });

/** Decode UTF-8, throwing on invalid sequences (TEXT frames require this). */
export function utf8Decode(buf: Buffer): string {
  return strictUtf8.decode(buf);
}

/**
 * Incremental frame parser.
 *
 * TCP gives us a byte stream with no respect for frame boundaries: one read
 * may contain half a frame, or three and a half. `push` buffers whatever has
 * arrived and returns only the frames that are complete.
 */
export class FrameDecoder {
  private buf: Buffer = Buffer.alloc(0);

  constructor(private readonly maxPayloadBytes: number = 1024 * 1024) {}

  push(chunk: Buffer): Frame[] {
    this.buf = this.buf.length === 0 ? chunk : Buffer.concat([this.buf, chunk]);

    const frames: Frame[] = [];
    for (;;) {
      const frame = this.tryReadFrame();
      if (!frame) break;
      frames.push(frame);
    }
    return frames;
  }

  /** Returns null when the buffer holds less than one complete frame. */
  private tryReadFrame(): Frame | null {
    if (this.buf.length < 2) return null;

    const b0 = this.buf[0]!;
    const b1 = this.buf[1]!;

    const fin = (b0 & 0x80) !== 0;
    // RSV1-3 are only legal once an extension (permessage-deflate, …) has been
    // negotiated in the handshake. We negotiate none, so they must be zero.
    if ((b0 & 0x70) !== 0) {
      throw new ProtocolError(1002, "RSV bits set but no extension negotiated");
    }

    const opcode = (b0 & 0x0f) as Opcode;
    if (!KNOWN_OPCODES.has(opcode)) {
      throw new ProtocolError(1002, `unknown opcode 0x${opcode.toString(16)}`);
    }

    const masked = (b1 & 0x80) !== 0;
    if (!masked) {
      throw new ProtocolError(1002, "client frames must be masked");
    }

    let len = b1 & 0x7f;
    let off = 2;
    if (len === 126) {
      if (this.buf.length < 4) return null;
      len = this.buf.readUInt16BE(2);
      off = 4;
    } else if (len === 127) {
      if (this.buf.length < 10) return null;
      const big = this.buf.readBigUInt64BE(2);
      // Reject before Number() so a 2^63 length can't be silently truncated.
      if (big > BigInt(this.maxPayloadBytes)) {
        throw new ProtocolError(1009, `payload ${big} exceeds limit`);
      }
      len = Number(big);
      off = 10;
    }

    if (isControlOpcode(opcode)) {
      if (!fin) throw new ProtocolError(1002, "fragmented control frame");
      if (len > 125) throw new ProtocolError(1002, "control frame payload >125");
    }
    if (len > this.maxPayloadBytes) {
      throw new ProtocolError(1009, `payload ${len} exceeds limit`);
    }

    const total = off + 4 + len;
    if (this.buf.length < total) return null;

    const key = this.buf.subarray(off, off + 4);
    const body = this.buf.subarray(off + 4, total);

    // Unmask into a fresh buffer — `body` is a view into `this.buf`, which we
    // are about to slide forward.
    const payload = Buffer.allocUnsafe(len);
    for (let i = 0; i < len; i++) {
      payload[i] = body[i]! ^ key[i & 3]!;
    }

    this.buf = this.buf.subarray(total);
    return { fin, opcode, payload };
  }
}
