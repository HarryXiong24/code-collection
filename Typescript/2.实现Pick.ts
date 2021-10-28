// 2 实现 Pick

/**
 * Implement the built-in Pick<T, K> generic without using it.
 * Constructs a type by picking the set of properties K from T
 */

// For example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};

// solution
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// test
type MyTest = MyPick<Todo, 'description' | 'completed'>;
const test: MyTest = {
  description: 'sss',
  completed: true,
};
