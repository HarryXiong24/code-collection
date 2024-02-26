// 4 Readonly

/**
 * Implement the built-in Readonly<T> generic without using it.
 * Constructs a type with all properties of T set to readonly, meaning the properties of the  constructed type cannot be reassigned.、
 */

// For example
interface Todo {
  title: string;
  description: string;
}
const todo: Readonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};
// Error: cannot reassign a readonly property
// todo.title = 'Hello';
// Error: cannot reassign a readonly property
// todo.description = 'barFoo';

// solution
export type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// test
const test: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};
// Error: cannot reassign a readonly property
// todo.title = 'Hello';
// Error: cannot reassign a readonly property
// todo.description = 'barFoo';
