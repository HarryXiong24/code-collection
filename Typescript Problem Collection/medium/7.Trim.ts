// 7 Trim

/**
 * Implement Trim<T> which takes an exact string type and returns a new string with the whitespace from both ends removed.
 */

// solution
type ignore = ' ' | '\n' | '\t';
export type Trim<T extends string> = T extends `${ignore}${infer R}${ignore}`
  ? Trim<R>
  : T;

// test
type Result = Trim<'  Hello World  '>; // expected to be 'Hello World'
