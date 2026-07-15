// 4 Last of Array

/**
 * Implement a generic Last<T> that takes an Array T and returns it's last element's type.
 */

// solution
export type Last<T extends any[]> = T extends [...any, infer K] ? K : never;

// test
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];
type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
