// 11 Append Argument

/**
 * For given function type Fn, and any type A (any in this context means we don't restrict the type, and I don't have in mind any type 😉) create a generic type which will take Fn as the first argument, A as the second, and will produce function type G which will be the same as Fn but with appended argument A as a last one.
 */

// solution
export type AppendArgument<
  T extends (...args: any) => any,
  K extends any
> = T extends (...args: infer U) => infer V ? (...args: [...U, K]) => V : never;

// test
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number
