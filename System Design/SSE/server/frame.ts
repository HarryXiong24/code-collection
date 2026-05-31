// SSE wire-format frame builder.
//
// Wire format (terminated by a blank line):
//   id: <id>\n           (optional — sets Last-Event-ID on the client)
//   event: <name>\n      (optional — defaults to "message")
//   retry: <ms>\n        (optional — reconnect hint)
//   data: <line-1>\n     (one or more — multi-line payloads use multiple data: lines)
//   data: <line-2>\n
//   \n

export interface SSEFrame {
  id?: string | number;
  event?: string;
  retry?: number;
  data: unknown; // string => sent as-is; anything else => JSON.stringify
}

export function buildFrame(frame: SSEFrame): string {
  const lines: string[] = [];

  if (frame.id !== undefined) lines.push(`id: ${frame.id}`);
  if (frame.event) lines.push(`event: ${frame.event}`);
  if (frame.retry !== undefined) lines.push(`retry: ${frame.retry}`);

  const payload =
    typeof frame.data === "string" ? frame.data : JSON.stringify(frame.data);

  // A single CR/LF inside `data` MUST be split into multiple `data:` lines —
  // the SSE spec terminates a frame on a bare \n\n.
  for (const line of payload.split(/\r\n|\r|\n/)) {
    lines.push(`data: ${line}`);
  }

  return lines.join("\n") + "\n\n";
}

// A bare comment line (`: ...`) is ignored by the EventSource parser but
// keeps proxies and load balancers from closing an idle TCP connection.
export function buildComment(text: string): string {
  return `: ${text}\n\n`;
}
