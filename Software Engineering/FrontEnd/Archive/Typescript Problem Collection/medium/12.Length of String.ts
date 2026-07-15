// 12 Length of String

/**
 * Compute the length of a string literal, which behaves like String#length.
 */

// solution
type Split<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...Split<B>]
  : [];
export type LengthOfString<S extends string> = Split<S>['length'];

// test
type Test = LengthOfString<'asd asa'>;
