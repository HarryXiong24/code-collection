// 8 Exclude

/**
 * Implement the built-in Exclude<T, U>
 * Exclude from T those types that are assignable to U
 */

// solution
export type MyExclude<T, U> = T extends U ? never : T;

// test
type a = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type b = 1;

const test: MyExclude<a, b> = 3;
