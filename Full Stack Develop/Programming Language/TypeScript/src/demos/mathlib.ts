/**
 * One "module" = one file. Use export to decide what's exposed; anything without export is module-private.
 * This is the example module imported by 14-modules.ts.
 */

// named exports: there can be several
export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export interface Point {
  x: number;
  y: number;
}

// module-private: no export, invisible outside, usable only indirectly through an exported function
const HIDDEN = 'module-private';

export function reveal(): string {
  return HIDDEN;
}

// default export: at most one per module, named however you like on import
export default function greet(name: string): string {
  return `Hi, ${name}`;
}
