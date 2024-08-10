// 13 Push

/**
 * Implement the generic version of Array.push
 */

// solution
export type MyPush<T extends any[], K> = [...T, K];

// test
type Result = MyPush<[1, 2], '3'>; // [1, 2, '3']
