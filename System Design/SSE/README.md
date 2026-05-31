# SSE (Server-Sent Events) Demo

## What is SSE?

**Server-Sent Events (SSE)** is a web standard that enables a server to push real-time updates to clients over a single, long-lived HTTP connection.

### SSE vs WebSocket

| Feature | SSE | WebSocket |
|---------|-----|-----------|
| Direction | Server → Client (unidirectional) | Bidirectional |
| Protocol | HTTP | WS (upgraded from HTTP) |
| Reconnect | Automatic (built into `EventSource`) | Manual |
| Data format | Text (UTF-8) | Text or Binary |
| Proxy/firewall | Works seamlessly | May be blocked |
| Complexity | Low | Higher |

**Use SSE when** you only need server-to-client streaming (notifications, live feeds, dashboards, log tailing).

### Wire Format

Each SSE message consists of one or more fields followed by a blank line:

```
id: 42
event: message
data: {"hello": "world"}

```

| Field | Required | Description |
|-------|----------|-------------|
| `data` | ✅ | Payload (can span multiple `data:` lines) |
| `event` | ❌ | Event name (defaults to `"message"`) |
| `id` | ❌ | Event ID; sets `Last-Event-ID` on reconnect |
| `retry` | ❌ | Reconnect interval in milliseconds |

## Architecture

```
┌──────────────┐       broadcast       ┌──────────────┐
│   Producer   │ ────────────────────▶ │    Broker     │
│  (timer /    │                       │  (pub/sub)    │
│   webhook)   │                       └──────┬───────┘
└──────────────┘                              │
                                  ┌───────────┼───────────┐
                                  ▼           ▼           ▼
                             ┌────────┐  ┌────────┐  ┌────────┐
                             │Client 1│  │Client 2│  │Client 3│
                             └────────┘  └────────┘  └────────┘
```

## Running

### Node.js

```bash
node sse-server.js
# Open http://localhost:3000
```

### Go

```bash
go run sse-server.go
# Open http://localhost:8080
```

Both servers include an embedded HTML client — just open the URL in your browser to see the live event stream.

## Files

| File | Description |
|------|-------------|
| `sse-server.js` | Node.js implementation — zero dependencies, runs directly with `node` |
| `sse-server.go` | Go implementation — goroutine-based broker with channel pub/sub |
