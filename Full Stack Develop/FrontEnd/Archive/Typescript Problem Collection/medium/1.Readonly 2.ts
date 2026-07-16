// 1 Readonly 2

/**
 * Implement a generic MyReadonly2<T, K> which takes two type argument T and K.
 * K specify the set of properties of T that should set to Readonly.
 * When K is not provided, it should make all properties readonly just like the normal Readonly<T>.
 */

// solution
type MyExclude<T, K> = T extends K ? never : T;
export type MyReadonly2<T, K extends keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in MyExclude<keyof T, K>]: T[P];
};

// test
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

// todo.title = 'Hello'; // Error: cannot reassign a readonly property
// todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
