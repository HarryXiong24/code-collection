# WebSocket Demo

A multi-room chat built on a **hand-written RFC 6455 implementation** — the handshake, the frame codec, fragmentation, ping/pong and the closing handshake are all in this directory. No `ws`, no `socket.io`, zero runtime dependencies.

The point is to see the protocol, not to hide it. In production you would use [`ws`](https://github.com/websockets/ws).

## WebSocket vs SSE

The sibling [`SSE (Server-Sent Events)`](../SSE%20(Server-Sent%20Events)) demo is deliberately the same shape. The contrast is the lesson:

| | SSE | WebSocket |
|---|---|---|
| Direction | Server → Client | **Bidirectional** |
| Protocol | Plain HTTP | HTTP upgrade → framed TCP |
| Reconnect | **Automatic** (`EventSource`) | **Manual** — you write the backoff |
| Missed messages | Automatic via `Last-Event-ID` | Your problem |
| Data | Text (UTF-8) | Text **or binary** |
| Framing | `data:` lines, blank-line terminated | Binary frames, length-prefixed |
| Heartbeat | Comment lines, app-level | **Built in** (ping/pong opcodes) |
| Complexity | Low | Higher |

**Reach for SSE first.** If the server only pushes — notifications, dashboards, log tailing, token streaming — SSE gives you reconnect and replay for free. Use WebSocket when the client genuinely needs to *send* too: chat, presence, collaborative editing, games.

## Protocol

### 1. The opening handshake (§4)

An ordinary HTTP GET carrying `Upgrade: websocket`. Node emits `'upgrade'` instead of `'request'` and hands over the raw socket:

```
GET /ws HTTP/1.1                         HTTP/1.1 101 Switching Protocols
Upgrade: websocket                 →     Upgrade: websocket
Connection: Upgrade                      Connection: Upgrade
Sec-WebSocket-Key: <16 random bytes>     Sec-WebSocket-Accept: base64(sha1(key + GUID))
Sec-WebSocket-Version: 13
```

`Sec-WebSocket-Accept` is not security — it's proof the server actually understood the request rather than being a cache that echoed it back. The GUID is a magic constant from the spec (`258EAFA5-…-C5AB0DC85B11`); a typo in it produces a handshake that looks perfect and that every client rejects.

After the 101 the socket is no longer HTTP.

### 2. Frames (§5)

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+-------------------------------+
|     Masking-key (0 or 4 bytes, present iff MASK==1)           |
+---------------------------------------------------------------+
|     Payload Data (XOR'd byte-wise with the masking key)       |
+---------------------------------------------------------------+
```

| Opcode | Meaning | |
|---|---|---|
| `0x0` | Continuation | data |
| `0x1` | Text (UTF-8) | data |
| `0x2` | Binary | data |
| `0x8` | Close | control |
| `0x9` | Ping | control |
| `0xA` | Pong | control |

Rules that are easy to miss and are enforced in [`server/frame.ts`](server/frame.ts):

- **Client→server frames MUST be masked; server→client frames MUST NOT be.** Masking is not encryption (the key is right there in the frame) — it exists so a malicious page can't make a proxy see attacker-chosen bytes and poison its cache.
- **Control frames must be ≤125 bytes and unfragmented**, and may be injected *between* fragments of a data message.
- **RSV bits must be zero** unless an extension was negotiated in the handshake.
- **Text frames must be valid UTF-8** — invalid sequences are a `1007` close, not a best-effort decode.
- Payload length is `7 | 7+16 | 7+64` bits. A 64-bit length must be range-checked *before* `Number()`.

### 3. Closing (§7)

A close is an **exchange**, not a hangup: send `0x8` with a code, peer echoes it, then the TCP socket dies. Codes `1005`/`1006` are local sentinels ("no code received" / "abnormal") and must never appear on the wire.

### 4. Liveness

TCP will happily present a half-open connection as healthy for a very long time. The server pings every 15s and drops any peer that misses a round. The ping payload is a timestamp, so the echoed pong yields RTT for free. Browsers answer pings in their networking layer — page JS never sees them.

## Architecture

```
   Browser                    │  Node
                              │
  WebSocket ──── ws://.../ws ─┼──▶ http.Server 'upgrade'
      │                       │         │
      │                       │    handshake.ts   101 + Sec-WebSocket-Accept
      │                       │         │
      │                       │    WSConnection   ── frame.ts (encode/decode)
      │  reconnect + backoff  │         │           fragmentation, ping/pong, close
      │  outbox queue         │         ▼
      │  re-join on reconnect │        Hub ── rooms · presence · typing · history
      │                       │         │
                              │    ┌────┴────┬─────────┐
                              │  #general  #random  #system-design
```

| File | Role |
|---|---|
| [`server/frame.ts`](server/frame.ts) | Frame codec + incremental decoder. TCP has no frame boundaries, so `FrameDecoder` buffers and yields only complete frames. |
| [`server/handshake.ts`](server/handshake.ts) | Upgrade validation and `Sec-WebSocket-Accept`. |
| [`server/connection.ts`](server/connection.ts) | One socket: fragmentation, control frames, close handshake, heartbeat, backpressure. |
| [`server/protocol.ts`](server/protocol.ts) | The *application* protocol (JSON). RFC 6455 moves bytes; it says nothing about meaning. Validates untrusted input. |
| [`server/hub.ts`](server/hub.ts) | Rooms, presence, typing, per-room history. |
| [`server/index.ts`](server/index.ts) | HTTP wiring + static files. |
| [`client/client.ts`](client/client.ts) | Browser client: backoff, outbox, re-join. |

## Running

```bash
npm install
npm run dev          # build + start
# open http://localhost:3001 in two tabs to chat with yourself
```

`PORT=4000 npm start` to change the port. (3001 by default, so it can run alongside the SSE demo on 3000.)

## Things worth trying

- **Open two tabs**, chat between them, watch presence and the typing indicator.
- **Kill the server** (`Ctrl-C`) with tabs open. Every client gets a `1001 going away`, then you watch the backoff climb — 0.5s, 1s, 2s, … capped at 10s, with jitter so a restart doesn't bring every client back in the same instant. Restart it and they re-join on their own.
- **Hit Disconnect, type a few messages, hit Connect.** The `queued` counter shows the outbox holding them; they flush on reconnect. This is the machinery `EventSource` would have given you for free.
- **Switch rooms** and confirm `#random` never sees `#general` traffic.
- `curl -i http://localhost:3001/ws` — a plain GET with no `Upgrade` header gets `426 Upgrade Required`, not a hang. Node only routes to the `'upgrade'` handler when the header is present.

## What a real deployment adds

This is a teaching implementation. Missing, roughly in order of how soon you'd want it:

- **Origin checking.** The handshake here accepts any origin. Browsers do *not* apply the same-origin policy to WebSocket, so a server that authenticates with cookies and skips this check is wide open to cross-site hijacking (CSWSH).
- **Authentication.** Anyone who can reach the port can join and pick any nickname.
- **Rate limiting.** One client can flood a room as fast as it can write.
- **`permessage-deflate`** (RFC 7692) — this is what the RSV1 bit is for.
- **Horizontal scale.** State lives in a `Map` in one process; a second instance shares nothing. Real systems put Redis pub/sub (or similar) behind the Hub.
- **Binary frames.** Decoded correctly, then rejected — the app protocol is JSON-over-text.

## Reference

- [RFC 6455 — The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)
- [RFC 7692 — Compression Extensions](https://datatracker.ietf.org/doc/html/rfc7692)
- [Autobahn|Testsuite](https://github.com/crossbario/autobahn-testsuite) — the conformance suite a real implementation must pass
