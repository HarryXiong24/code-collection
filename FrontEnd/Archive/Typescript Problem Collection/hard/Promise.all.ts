// Promise.all

/**
 * Type the function PromiseAll that accepts an array of PromiseLike objects, the returning value should be Promise<T> where T is the resolved result array.
 */

// solution
export declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [key in keyof T]: T[key] extends PromiseLike<infer V> ? V : T[key];
}>;

// test
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, number, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
