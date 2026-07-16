import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Duplex } from "node:stream";
import { buildAcceptResponse, buildRejectResponse, checkUpgrade } from "./handshake.js";
import { WSConnection } from "./connection.js";
import { Hub } from "./hub.js";

// ---------------------------------------------------------------------------
// HTTP server wiring.
//
//   GET /ws       — WebSocket upgrade (handled on the 'upgrade' event)
//   GET /         — serve public/index.html
//   GET /static/* — serve the compiled client bundle
//
// Node emits 'upgrade' instead of 'request' when a request carries an
// `Upgrade` header, and hands over the raw socket with HTTP parsing stopped.
// From that point the bytes are ours.
// ---------------------------------------------------------------------------

const PORT = Number(process.env.PORT ?? 3001);

// dist/server/index.js → project root is two levels up.
const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..", "..");
const PUBLIC_DIR = join(ROOT, "public");

const hub = new Hub({ rooms: ["general", "random", "system-design"], historySize: 50 });

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
};

async function serveStatic(res: ServerResponse, urlPath: string): Promise<void> {
  // Prevent path traversal.
  const safe = normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
  const filePath = join(PUBLIC_DIR, safe);
  if (!filePath.startsWith(PUBLIC_DIR + sep) && filePath !== PUBLIC_DIR) {
    res.writeHead(403).end("forbidden");
    return;
  }
  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}

const server = createServer(async (req, res) => {
  if (!req.url || !req.method) {
    res.writeHead(400).end("bad request");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    await serveStatic(res, "index.html");
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/static/")) {
    await serveStatic(res, url.pathname.slice("/".length));
    return;
  }

  // A plain GET /ws never reaches the 'upgrade' handler — without an Upgrade
  // header Node routes it here. 426 is the honest answer, and it beats a 404
  // that makes the endpoint look missing.
  if (url.pathname === "/ws") {
    res
      .writeHead(426, { "Content-Type": "text/plain; charset=utf-8", "Sec-WebSocket-Version": "13" })
      .end("this endpoint requires a websocket upgrade\n");
    return;
  }

  res.writeHead(404).end("not found");
});

let connectionCounter = 0;

server.on("upgrade", (req: IncomingMessage, socket: Duplex, head: Buffer) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  if (url.pathname !== "/ws") {
    socket.end(buildRejectResponse(400, "no websocket endpoint here"));
    return;
  }

  const check = checkUpgrade(req);
  if (!check.ok) {
    console.warn(`[server] rejected upgrade: ${check.message}`);
    socket.end(buildRejectResponse(check.status, check.message));
    return;
  }

  socket.write(buildAcceptResponse(check.key));

  const conn = new WSConnection(socket, {
    id: `conn-${++connectionCounter}`,
    heartbeatMs: 15_000,
    maxPayloadBytes: 64 * 1024,
  });

  // `head` is any payload that arrived in the same TCP segment as the
  // handshake — a fast client can start framing before we finish replying.
  if (head.length > 0) socket.unshift(head);

  console.log(`[server] + ${conn.id} upgraded from ${req.socket.remoteAddress}`);
  hub.accept(conn);
});

server.listen(PORT, () => {
  console.log(`WebSocket server listening on http://localhost:${PORT}  (ws://localhost:${PORT}/ws)`);
});

// Graceful shutdown — send a 1001 "going away" to every peer before exiting.
function shutdown(signal: string): void {
  console.log(`\n[server] received ${signal} — shutting down`);
  hub.shutdown(`server received ${signal}`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5_000).unref();
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
