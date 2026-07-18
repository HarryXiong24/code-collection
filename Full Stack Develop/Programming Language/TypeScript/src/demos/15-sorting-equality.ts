import { note, show, title } from '../log.js';

/**
 * Custom sorting & equality — sort by your own rules, define "equality" for your own types.
 * Key points:
 *   1. Array.sort takes a comparator (a, b) => number: negative puts a first, positive puts b first, 0 unchanged.
 *   2. sort mutates in place and (since ES2019) is stable; to keep the original array, copy with [...arr] first.
 *   3. Multi-key sorting = chained comparators: only look at the next when the previous returns 0.
 *   4. Objects have no operator overloading; === compares references, not content.
 *   5. To "dedup/find by value", build your own key (a string or tuple), then use Map/Set.
 */

interface Person {
  name: string;
  dept: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', dept: 'eng', age: 30 },
  { name: 'Bob', dept: 'sales', age: 25 },
  { name: 'Carol', dept: 'eng', age: 25 },
  { name: 'Dave', dept: 'sales', age: 40 },
];

// comparator combinators: split "take a key, descending, then compare" into reusable little tools
type Cmp<T> = (a: T, b: T) => number;
const by =
  <T, K extends number | string>(key: (x: T) => K): Cmp<T> =>
  (a, b) =>
    key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
const desc =
  <T>(cmp: Cmp<T>): Cmp<T> =>
  (a, b) =>
    -cmp(a, b);
const thenBy =
  <T>(first: Cmp<T>, second: Cmp<T>): Cmp<T> =>
  (a, b) =>
    first(a, b) || second(a, b); // 0 is falsy, only then compare the next key

const names = (ps: Person[]): string[] => ps.map((p) => p.name);

export function sortingEqualityDemo(): void {
  title('15 Custom sorting & equality');

  note('single-key sort: comparator (a,b)=>a.age-b.age (copy then sort, leaving the original untouched)');
  show('by age ascending', names([...people].sort(by((p) => p.age))));

  note('multi-key sort: dept ascending, then age descending within the same dept');
  show('dept↑ then age↓', names([...people].sort(thenBy(by((p) => p.dept), desc(by((p) => p.age))))));

  note('sort strings by locale convention with localeCompare');
  show('by name', names([...people].sort((a, b) => a.name.localeCompare(b.name))));

  note('stability: sort by dept only, keeping the original relative order within a group (Alice before Carol)');
  show('stable sort', names([...people].sort(by((p) => p.dept))));

  note('equality: === compares references, two objects with the same content are not equal');
  const a: Person = { name: 'Alice', dept: 'eng', age: 30 };
  const b: Person = { name: 'Alice', dept: 'eng', age: 30 };
  show('a === b (different references)', a === b);

  note('to compare/dedup by value, build your own key then use Set/Map');
  const keyOf = (p: Person): string => `${p.name}|${p.dept}|${p.age}`;
  const seen = new Map(people.concat(a).map((p) => [keyOf(p), p]));
  show('keyOf(a) === keyOf(b)', keyOf(a) === keyOf(b));
  show('count after dedup by key', seen.size); // a shares a key with the existing Alice → no new entry
}
