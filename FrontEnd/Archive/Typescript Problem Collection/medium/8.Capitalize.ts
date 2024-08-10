// 8 Capitalize

/**
 * Implement Capitalize<T> which converts the first letter of a string to uppercase and leave the rest as-is.
 */

// solution
export type Capitalize<S extends string> = S extends `${infer T}${infer U}`
  ? `${Uppercase<T>}${U}`
  : S;

// test
type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
