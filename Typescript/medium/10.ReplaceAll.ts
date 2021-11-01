// 10 ReplaceAll

/**
 * Implement ReplaceAll<S, From, To> which replace the all the substring From with To in the given string S
 */

// solution
export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer A}${From}${infer Rest}`
  ? `${A}${To}${ReplaceAll<Rest, From, To>}`
  : S;

// test
type replaced = ReplaceAll<'t y p e s', ' ', ''>; // expected to be 'types'
