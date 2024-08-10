// 10 If

/**
 * Implement a utils If which accepts condition C, a truthy return type T, and a falsy return type F. C is expected to be either true or false while T and F can be any type.
 */

// solution

// 这种解法不够好，没有限制住 C 必须要是 boolean 类型
export type MyIf<C, T, F> = C extends true ? T : F;

// better
export type Better_If<C extends boolean, T, F> = C extends true ? T : F;

// test
type A = MyIf<true, 'a', 'b'>; // expected to be 'a'
type B = MyIf<false, 'a', 'b'>; // expected to be 'b'
