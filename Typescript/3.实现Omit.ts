// 3 实现 Omit

/**
 * Implement the built-in Omit<T, K> generic without using it.
 * Constructs a type by picking all properties from T and then removing K
 */

// For example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, 'description' | 'title'>;
const todo: TodoPreview = {
  completed: false,
};

// solution
// 如果 T 不在 K 里面，保存 K
type MyExclude<K, T> = K extends T ? never : K;
export type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

// test
type MyTest = MyOmit<Todo, 'description' | 'title'>;
const test: MyTest = {
  completed: false,
};
