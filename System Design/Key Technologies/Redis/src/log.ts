const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
} as const;

export function title(text: string): void {
  console.log(`\n${C.bold}${C.cyan}━━ ${text} ${'━'.repeat(Math.max(0, 56 - text.length))}${C.reset}`);
}

/** 打印一条命令和它的返回值，对齐成 `CMD ARGS  →  result`。 */
export function cmd(command: string, result: unknown): void {
  console.log(`  ${C.green}${command.padEnd(44)}${C.reset}${C.dim}→${C.reset} ${format(result)}`);
}

export function note(text: string): void {
  console.log(`  ${C.dim}# ${text}${C.reset}`);
}

export function warn(text: string): void {
  console.log(`  ${C.yellow}! ${text}${C.reset}`);
}

export function error(text: string): void {
  console.log(`  ${C.red}✗ ${text}${C.reset}`);
}

function format(v: unknown): string {
  if (v === null) return `${C.dim}(nil)${C.reset}`;
  if (Array.isArray(v)) return `[${v.map(format).join(', ')}]`;
  if (typeof v === 'object') return JSON.stringify(v);
  if (typeof v === 'string') return `"${v}"`;
  return String(v);
}

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
