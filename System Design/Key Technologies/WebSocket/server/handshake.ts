import { createHash } from "node:crypto";
import type { IncomingMessage } from "node:http";

// ---------------------------------------------------------------------------
// RFC 6455 §4 — the opening handshake.
//
// A WebSocket connection starts life as an ordinary HTTP/1.1 GET:
//
//   GET /ws HTTP/1.1
//   Host: localhost:3000
//   Upgrade: websocket
//   Connection: Upgrade
//   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
//   Sec-WebSocket-Version: 13
//
// The server proves it actually speaks WebSocket (rather than being an HTTP
// cache that echoed something back) by hashing the client's nonce with a fixed
// GUID and returning it:
//
//   HTTP/1.1 101 Switching Protocols
//   Upgrade: websocket
//   Connection: Upgrade
//   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
//
// After the 101 the socket is no longer HTTP — it carries raw frames.
// ---------------------------------------------------------------------------

// Fixed by RFC 6455 §1.3. Every byte matters and a typo here fails in the most
// confusing way possible: the handshake looks perfect on the wire and every
// client rejects it. The RFC's own test vector guards it —
//   key "dGhlIHNhbXBsZSBub25jZQ==" => accept "s3pPLMBiTxaQ9kYGzzhZRbK+xOo="
const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

/** Sec-WebSocket-Accept = base64(sha1(key + GUID)). */
export function computeAcceptKey(key: string): string {
  return createHash("sha1")
    .update(key + WS_GUID)
    .digest("base64");
}

export type UpgradeCheck =
  | { ok: true; key: string }
  | { ok: false; status: number; message: string };

export function checkUpgrade(req: IncomingMessage): UpgradeCheck {
  if (req.method !== "GET") {
    return { ok: false, status: 405, message: "websocket upgrade must be GET" };
  }

  const upgrade = req.headers.upgrade ?? "";
  if (upgrade.toLowerCase() !== "websocket") {
    return { ok: false, status: 400, message: "expected Upgrade: websocket" };
  }

  // `Connection` is a comma-separated list and is case-insensitive —
  // Firefox sends "keep-alive, Upgrade".
  const connection = req.headers.connection ?? "";
  const wantsUpgrade = connection
    .split(",")
    .some((token) => token.trim().toLowerCase() === "upgrade");
  if (!wantsUpgrade) {
    return { ok: false, status: 400, message: "expected Connection: Upgrade" };
  }

  if (req.headers["sec-websocket-version"] !== "13") {
    return { ok: false, status: 426, message: "only Sec-WebSocket-Version 13 is supported" };
  }

  const key = req.headers["sec-websocket-key"];
  if (typeof key !== "string" || Buffer.from(key, "base64").length !== 16) {
    return { ok: false, status: 400, message: "missing or malformed Sec-WebSocket-Key" };
  }

  return { ok: true, key };
}

export function buildAcceptResponse(key: string): string {
  return [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${computeAcceptKey(key)}`,
    "",
    "",
  ].join("\r\n");
}

export function buildRejectResponse(status: number, message: string): string {
  const body = `${message}\n`;
  return [
    `HTTP/1.1 ${status} ${STATUS_TEXT[status] ?? "Error"}`,
    "Content-Type: text/plain; charset=utf-8",
    `Content-Length: ${Buffer.byteLength(body)}`,
    ...(status === 426 ? ["Sec-WebSocket-Version: 13"] : []),
    "Connection: close",
    "",
    body,
  ].join("\r\n");
}

const STATUS_TEXT: Record<number, string> = {
  400: "Bad Request",
  405: "Method Not Allowed",
  426: "Upgrade Required",
};
