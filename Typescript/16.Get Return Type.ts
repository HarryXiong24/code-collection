// 16 Get Return Type

/**
 * Implement the built-in ReturnType<T> generic without using it.
 */

// solution
export type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

// test
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"
