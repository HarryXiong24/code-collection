// 11 Concat

/**
 * Implement the JavaScript Array.concat function in the type system.
 * A type takes the two arguments.
 * The output should be a new array that includes inputs in ltr order.
 */

// solution

export type MyConcat<T extends any[], K extends any[]> = [...T, ...K];

// For example

type Result = MyConcat<[1], [2]>; // expected to be [1, 2]
