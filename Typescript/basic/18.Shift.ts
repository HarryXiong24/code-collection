// 18 Shift

/**
 * Implement the type version of Array.shift
 */

// solution
export type Shift<T extends any[]> = T extends [any, ...infer K] ? K : never;

// test
type Result = Shift<[3, 2, 1]>; // [2, 1]
