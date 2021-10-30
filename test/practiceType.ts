/**
 * 2021.10.30
 */

// Tuple to Object
export type TupleToObject<T extends any[]> = {
  [P in T[number]]: P;
};

// First of Array
export type First<T extends any[]> = T extends [infer K, ...any] ? K : never;
export type First2<T extends any[]> = T['length'] extends 0 ? never : T[0];

// Last of Array
export type Last<T extends any[]> = T extends [...any, infer K] ? K : never;

// Length of Tuple
export type Length<T extends any[]> = T['length'];

// If
export type If<T extends boolean, K, V> = T extends true ? K : V;

// Concat
export type MyConcat<T extends any[], K extends any[]> = [...T, ...K];

// Push
export type MyPush<T extends any[], K> = [...T, K];

// Unshift
export type MyUnshift<T extends any[], K> = [K, ...T];
