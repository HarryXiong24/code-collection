// 14 Unshift

/**
 * Implement the type version of Array.unshift
 */

// solution
export type MyUnshift<T extends any[], K> = [K, ...T];

// test
type Result = MyUnshift<[1, 2], 0>; // [0, 1, 2,]
