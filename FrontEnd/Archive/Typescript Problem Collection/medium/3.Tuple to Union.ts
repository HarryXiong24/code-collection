// 3 Tuple to Union

/**
 * Implement a generic TupleToUnion<T> which covers the values of a tuple to its values union.
 */

// solution
// 注意 T[number] 会自动的遍历数组里的所有值
export type TupleToUnion<T extends any[]> = T[number];

// test
type Arr = ['1', '2', '3'];
const a: TupleToUnion<Arr> = '1'; // expected to be '1' | '2' | '3'
