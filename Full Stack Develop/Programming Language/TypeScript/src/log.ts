/**
 * A minimal printing helper: every demo uses it to print "expression → result" aligned,
 * so a single run shows the real behavior of a language feature without memorizing docs.
 * The language projects (TypeScript / Go / Python) all provide the same title / note / show.
 */
const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
} as const;

/** A section heading */
export function title(text: string): void {
  console.log(`\n${C.bold}${C.cyan}━━ ${text} ${'━'.repeat(Math.max(0, 56 - text.length))}${C.reset}`);
}

/** An explanatory line (a dimmed comment starting with #) */
export function note(text: string): void {
  console.log(`  ${C.dim}# ${text}${C.reset}`);
}

/** Print "expression → result", aligned as expr  →  value */
export function show(expr: string, value: unknown): void {
  console.log(`  ${C.green}${expr.padEnd(44)}${C.reset}${C.dim}→${C.reset} ${format(value)}`);
}

export function warn(text: string): void {
  console.log(`  ${C.yellow}! ${text}${C.reset}`);
}

export function error(text: string): void {
  console.log(`  ${C.red}✗ ${text}${C.reset}`);
}

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function format(v: unknown): string {
  if (v === null) return `${C.dim}null${C.reset}`;
  if (v === undefined) return `${C.dim}undefined${C.reset}`;
  if (typeof v === 'string') return `"${v}"`;
  if (typeof v === 'bigint') return `${v}n`;
  if (v instanceof Map) return `Map(${JSON.stringify([...v.entries()])})`;
  if (v instanceof Set) return `Set(${JSON.stringify([...v.values()])})`;
  if (Array.isArray(v)) return `[${v.map(format).join(', ')}]`;
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}
