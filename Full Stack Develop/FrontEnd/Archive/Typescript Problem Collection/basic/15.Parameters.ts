// 15 Parameters

/**
 * Implement the built-in Parameters generic without using it.
 * Parameters 获取函数的参数类型，将每个参数类型放在一个元组中
 */

// solution
export type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

// test
const res: MyParameters<(arg1: number, arg2: string) => string> = [1, 'a'];
