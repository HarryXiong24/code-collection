// 6 First of Array

/**
 * Implement a generic First<T> that takes an Array T and returns it's first element's type.
 */

export type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

// test
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];
type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3

const head1: head1 = 'a';
const head2: head2 = 3;
