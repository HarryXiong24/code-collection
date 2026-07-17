/**
 * 极简打印工具：每个 demo 都用它把「表达式 → 结果」对齐打印出来，
 * 跑一遍就能看到语言特性的真实行为，不用去背文档。
 * 三个语言项目（TypeScript / Go / Python）都提供了同一套 title / note / show。
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

/** 一节的标题 */
export function title(text: string): void {
  console.log(`\n${C.bold}${C.cyan}━━ ${text} ${'━'.repeat(Math.max(0, 56 - text.length))}${C.reset}`);
}

/** 一行讲解（以 # 开头的灰色注释） */
export function note(text: string): void {
  console.log(`  ${C.dim}# ${text}${C.reset}`);
}

/** 打印「表达式 → 结果」，对齐成 expr  →  value */
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
