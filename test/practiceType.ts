/**
 * 2021.10.30
 */

// Tuple to Object
export type TupleToObject<T extends any[]> = {
  [P in T[number]]: P;
};

// First of Array
export type First<T extends any[]> = T extends [infer K, ...any] ? K : never;
