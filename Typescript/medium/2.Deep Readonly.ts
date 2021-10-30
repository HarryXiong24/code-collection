// 2 Deep Readonly

/**
 * Implement a generic DeepReadonly<T> which make every parameter of an object - and its sub-objects recursively - readonly.
 * You can assume that we are only dealing with Objects in this challenge.
 * Arrays, Functions, Classes and so on are no need to take into consideration.
 * However, you can still challenge your self by covering different cases as many as possbile.
 */

// solution
export type DeepReadonly<T> = {
  readonly [k in keyof T]: DeepReadonly<T[k]>;
};

// test
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};
type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};
const todo: DeepReadonly<X> = {
  x: {
    a: 1,
    b: 'hi',
  },
  y: 'hey',
}; // should be same as `Expected`
// todo.x.a = 8;
// todo.x.b = 'hi';
// todo.x = {
//   s: '',
// };
// todo.y = 'sda';
