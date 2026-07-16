// ---------------------------------------------------------------------------
// Application protocol — JSON over WebSocket TEXT frames.
//
// RFC 6455 gets bytes across; it says nothing about what they mean. Every real
// deployment layers its own message protocol on top, which is what this file
// is. (`Sec-WebSocket-Protocol` exists to negotiate *which* one, but with a
// single protocol there is nothing to negotiate.)
//
// Everything arriving from a socket is untrusted input, so the parse below is
// an explicit validator, not a cast: `JSON.parse(raw) as ClientMessage` is a
// lie the type system happily believes.
// ---------------------------------------------------------------------------

export type ClientMessage =
  | { type: "join"; room: string; name: string }
  | { type: "chat"; text: string }
  | { type: "typing"; state: boolean }
  | { type: "leave" };

export interface ChatMessage {
  id: number;
  from: string;
  text: string;
  ts: number;
}

export type ServerMessage =
  | { type: "welcome"; id: string; rooms: string[] }
  | { type: "joined"; room: string; name: string; history: ChatMessage[] }
  | { type: "chat"; room: string; message: ChatMessage }
  | { type: "presence"; room: string; members: string[] }
  | { type: "typing"; room: string; from: string; state: boolean }
  | { type: "system"; room: string; text: string }
  | { type: "error"; message: string };

export const MAX_TEXT_LENGTH = 2_000;
export const MAX_NAME_LENGTH = 24;

export function parseClientMessage(raw: string): ClientMessage {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("message is not valid JSON");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("message must be an object");
  }
  const msg = parsed as Record<string, unknown>;

  switch (msg["type"]) {
    case "join": {
      const room = requireString(msg["room"], "room", 64);
      const name = requireString(msg["name"], "name", MAX_NAME_LENGTH);
      return { type: "join", room, name };
    }
    case "chat": {
      const text = requireString(msg["text"], "text", MAX_TEXT_LENGTH);
      return { type: "chat", text };
    }
    case "typing": {
      if (typeof msg["state"] !== "boolean") throw new Error("typing.state must be a boolean");
      return { type: "typing", state: msg["state"] };
    }
    case "leave":
      return { type: "leave" };
    default:
      throw new Error(`unknown message type: ${String(msg["type"])}`);
  }
}

function requireString(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string") throw new Error(`${field} must be a string`);
  const trimmed = value.trim();
  if (trimmed.length === 0) throw new Error(`${field} must not be empty`);
  if (trimmed.length > maxLength) throw new Error(`${field} exceeds ${maxLength} characters`);
  return trimmed;
}
