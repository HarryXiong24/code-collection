import { note, show, title } from '../log.js';

/**
 * Generics — "parameterize" types, write logic once that fits many types without losing type info.
 * Key points:
 *   1. <T> is a type parameter; at the call site you can pass it explicitly or let it be inferred from arguments.
 *   2. The constraint `<T extends X>` requires T to have at least certain capabilities.
 *   3. Generics work for functions, classes, interfaces, and type aliases.
 *   4. keyof + indexed types achieve "type-safe access by key".
 *   5. Default type parameter `<T = string>`.
 */

// generic function: whatever type goes in, that type comes out
function identity<T>(x: T): T {
  return x;
}

// constraint: T must have a length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

// keyof + indexing: the type of obj[key] is exactly the corresponding field's type
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// generic class: a type-safe stack
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  get size(): number {
    return this.items.length;
  }
}

export function genericsDemo(): void {
  title('06 Generics');

  note('generic function: the type is inferred from the argument');
  show('identity<number>(42)', identity(42));
  show('identity("hi")', identity('hi'));

  note('constraint: anything with length can be compared, both strings and arrays work');
  show('longest("abcd", "xy")', longest('abcd', 'xy'));
  show('longest([1,2], [3,4,5])', longest([1, 2], [3, 4, 5]));

  note('keyof: access by key with a precise type (a mistyped key is a compile error)');
  const user = { id: 1, name: 'Harry', active: true };
  show('pluck(user, "name")', pluck(user, 'name'));
  show('pluck(user, "active")', pluck(user, 'active'));

  note('generic class: Stack<number> accepts only number');
  const st = new Stack<number>();
  st.push(1);
  st.push(2);
  show('stack.pop()', st.pop());
  show('stack.size', st.size);

  note('built-in utility types are based on generics: Partial / Pick / Readonly …');
  type User = typeof user;
  const patch: Partial<User> = { name: 'Alice' }; // all fields become optional
  show('Partial patch', patch);
}
