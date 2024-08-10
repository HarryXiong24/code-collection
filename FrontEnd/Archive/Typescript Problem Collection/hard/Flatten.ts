// Flatten

/**
 * In this challenge, you would need to write a type that takes an array and emitted the flatten array type.
 */

// solution
/**
 * 先判断第一个是否为数组，是的话递归判断，直到它递归到不是一个数组后将这个值放在数组里面
 * 一直重复这个过程
 */
export type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...(First extends any[] ? Flatten<First> : [First]), ...Flatten<Rest>]
  : [];

// test
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
