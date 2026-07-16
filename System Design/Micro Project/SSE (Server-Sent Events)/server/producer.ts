import type { SSEBroker } from "./broker.js";

// Simulated event producer. Real systems would replace this with a
// pubsub subscription, a Kafka consumer, a webhook listener, etc.

export function startEventProducer(broker: SSEBroker, intervalMs = 2_000): () => void {
  let tick = 0;

  const timer = setInterval(() => {
    tick++;
    const now = new Date().toISOString();

    broker.broadcast({
      event: "message",
      data: { tick, time: now, payload: "Hello from SSE!" },
    });

    // A separate heartbeat *event* (distinct from the broker's keepalive
    // comment) so the client can render a "still alive" indicator.
    if (tick % 5 === 0) {
      broker.broadcast({ event: "heartbeat", data: { tick, time: now } });
    }
  }, intervalMs);

  return () => clearInterval(timer);
}
