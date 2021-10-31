// 6 Trim Left

/**
 * Implement TrimLeft<T> which takes an exact string type and returns a new string with the whitespace beginning removed.
 */

// solution
type ignore = ' ' | '\t' | '\n';
// 递归解决很多空格的情况
export type TrimLeft<T extends string> = T extends `${ignore}${infer R}`
  ? TrimLeft<R>
  : T;

// test
type Result = TrimLeft<'  Hello World  '>; // expected to be 'Hello World  '
