import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { SSEBroker } from "./broker.js";
import { startEventProducer } from "./producer.js";

// ---------------------------------------------------------------------------
// HTTP server wiring.
//
//   GET /events?topics=a,b           — SSE stream (Last-Event-ID is respected)
//   GET /                            — serve public/index.html
//   GET /static/*                    — serve compiled client TS bundle
// ---------------------------------------------------------------------------

const PORT = Number(process.env.PORT ?? 3000);

// dist/server/index.js → repo root is two levels up.
const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..", "..");
const PUBLIC_DIR = join(ROOT, "public");

const broker = new SSEBroker({
  replayBufferSize: 256,
  heartbeatMs: 15_000,
  retryHintMs: 3_000,
});
const stopProducer = startEventProducer(broker);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
};

async function serveStatic(req: IncomingMessage, res: ServerResponse, urlPath: string): Promise<void> {
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

  if (req.method === "GET" && url.pathname === "/events") {
    const topicsParam = url.searchParams.get("topics");
    const topics = topicsParam ? topicsParam.split(",").map((t) => t.trim()).filter(Boolean) : undefined;
    const lastEventId =
      (req.headers["last-event-id"] as string | undefined) ??
      url.searchParams.get("lastEventId") ??
      undefined;
    broker.addClient(res, { lastEventId, topics });
    return;
  }

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    await serveStatic(req, res, "index.html");
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/static/")) {
    await serveStatic(req, res, url.pathname.slice("/".length));
    return;
  }

  res.writeHead(404).end("not found");
});

server.listen(PORT, () => {
  console.log(`SSE server listening on http://localhost:${PORT}`);
});

// Graceful shutdown — flush a `close` event to every client before exiting.
function shutdown(signal: string): void {
  console.log(`\n[server] received ${signal} — shutting down`);
  stopProducer();
  broker.shutdown(`server received ${signal}`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5_000).unref();
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
