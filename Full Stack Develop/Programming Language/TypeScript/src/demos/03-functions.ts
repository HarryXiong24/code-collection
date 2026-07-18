import { note, show, title } from '../log.js';

/**
 * Functions — parameters, defaults, rest parameters, return types, closures, higher-order functions.
 * Key points:
 *   1. Both parameters and return values can be annotated; the return type is usually inferred.
 *   2. Optional parameters `?`, defaults `=`, rest parameters `...args`.
 *   3. Arrow functions don't bind their own this, and the syntax is shorter.
 *   4. Functions are first-class citizens: usable as arguments and return values → higher-order functions.
 *   5. Function overloading is expressed with multiple signatures + one implementation body.
 */

// named function: fully annotated
function add(a: number, b: number): number {
  return a + b;
}

// optional parameter + default + rest parameters
function greet(name: string, greeting = 'Hi', ...tags: string[]): string {
  const suffix = tags.length ? ` [${tags.join(', ')}]` : '';
  return `${greeting}, ${name}${suffix}`;
}

// higher-order function: takes a function, returns a function (the closure remembers factor)
function multiplier(factor: number): (n: number) => number {
  return (n) => n * factor;
}

// function overloading: expose two signatures, one implementation inside
function len(x: string): number;
function len(x: unknown[]): number;
function len(x: string | unknown[]): number {
  return x.length;
}

export function functionsDemo(): void {
  title('03 Functions');

  show('add(2, 3)', add(2, 3));

  note('defaults / optional / rest parameters');
  show('greet("Harry")', greet('Harry'));
  show('greet("Harry", "Hello")', greet('Harry', 'Hello'));
  show('greet("Harry", "Hey", "vip", "new")', greet('Harry', 'Hey', 'vip', 'new'));

  note('arrow function: an expression body returns automatically, often used as a callback');
  const square = (n: number): number => n * n;
  show('square(9)', square(9));

  note('closure: the returned function remembers the outer variable factor');
  const triple = multiplier(3);
  show('triple(10)', triple(10));

  note('higher-order function: pass behavior in as an argument');
  const apply = <T, R>(value: T, fn: (v: T) => R): R => fn(value);
  show('apply(5, square)', apply(5, square));

  note('function overloading: same name, different signatures, dispatched in the implementation');
  show('len("hello")', len('hello'));
  show('len([1, 2, 3])', len([1, 2, 3]));

  note('destructured parameters + defaults, often used for a "config object" argument');
  const connect = ({ host = 'localhost', port = 5432 }: { host?: string; port?: number }): string =>
    `${host}:${port}`;
  show('connect({ port: 6379 })', connect({ port: 6379 }));
}
