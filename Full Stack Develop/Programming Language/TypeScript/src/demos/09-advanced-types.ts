import { note, show, title } from '../log.js';

/**
 * Advanced types — the signature capability of TS's type system: unions, literals, narrowing, mapped, conditional, guards.
 * Key points:
 *   1. Union type A | B, intersection type A & B.
 *   2. Literal type + union = a lightweight enum ('red' | 'green').
 *   3. Type narrowing: typeof / in / instanceof / custom type guards.
 *   4. Mapped types { [K in keyof T]: ... } and conditional types T extends U ? X : Y.
 *   5. enum is one of the few type features with a "runtime product".
 */

// literal union used as an enum (no runtime overhead)
type Direction = 'up' | 'down' | 'left' | 'right';

// real enum: generates a runtime object, supports reverse lookup
enum Status {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
}

// custom type guard: returns x is Cat so the compiler narrows in the true branch
interface Cat {
  meow(): string;
}
interface Dog {
  bark(): string;
}
function isCat(a: Cat | Dog): a is Cat {
  return 'meow' in a;
}

// conditional type + mapped type
type Nullable<T> = { [K in keyof T]: T[K] | null };

export function advancedTypesDemo(): void {
  title('09 Advanced types');

  note('literal union: only these values are allowed, a wrong one is a compile error');
  const move = (d: Direction): string => `move ${d}`;
  show('move("up")', move('up'));

  note('enum has a runtime product, supports forward and reverse lookup');
  show('Status.Active', Status.Active);
  show('Object.values(Status)', Object.values(Status));

  note('type narrowing: typeof distinguishes union members');
  const format = (v: string | number): string => (typeof v === 'number' ? v.toFixed(1) : v.toUpperCase());
  show('format(3.14159)', format(3.14159));
  show('format("hi")', format('hi'));

  note('custom type guard: a is Cat, in the true branch you can safely call meow()');
  const animal: Cat | Dog = { meow: () => 'meow' };
  show('isCat dispatch', isCat(animal) ? animal.meow() : (animal as Dog).bark());

  note('intersection type A & B: has the fields of both sides');
  type WithId = { id: number };
  type WithName = { name: string };
  const entity: WithId & WithName = { id: 1, name: 'Harry' };
  show('A & B', entity);

  note('mapped type: turn every field into T | null');
  const draft: Nullable<WithName> = { name: null };
  show('Nullable<WithName>', draft);
}
