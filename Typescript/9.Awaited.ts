// 9 Awaited

/**
 * If we have a type which is wrapped type like Promise.
 * How we can get a type which is inside the wrapped type?
 * For example if we have Promise<ExampleType> how to get ExampleType?
 */

// solution
export type Awaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

// test
interface test {
  title: string;
  description: string;
}
const test: Awaited<Promise<test>> = {
  title: 'title',
  description: 'description',
};
