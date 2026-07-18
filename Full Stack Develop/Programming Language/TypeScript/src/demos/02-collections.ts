import { note, show, title } from '../log.js';

/**
 * Collection types — array / tuple / object record / Map / Set.
 * Key points:
 *   1. An array T[] (or Array<T>) is homogeneous and variable-length.
 *   2. A tuple [A, B] is fixed-length with a fixed type per position.
 *   3. When using an object as a dictionary, prefer Record<K, V> or Map.
 *   4. Map preserves insertion order and keys can be any type; Set deduplicates.
 *   5. Spread ... and destructuring are the daily workhorse syntax.
 */
export function collectionsDemo(): void {
  title('02 Collection types');

  note('array: homogeneous, variable-length; functional method chaining is idiomatic');
  const nums: number[] = [3, 1, 4, 1, 5, 9];
  show('nums.map(x=>x*2)', nums.map((x) => x * 2));
  show('nums.filter(x=>x>3)', nums.filter((x) => x > 3));
  show('nums.reduce(sum)', nums.reduce((a, b) => a + b, 0));
  show('[...nums].sort((a,b)=>a-b)', [...nums].sort((a, b) => a - b)); // copy then sort, don't mutate in place

  note('tuple: fixed-length, a different type per position, often used to "return multiple values"');
  const point: [number, number] = [10, 20];
  const [x, y] = point;
  show('[x, y]', [x, y]);
  const pair: [string, number] = ['age', 30];
  show('pair', pair);

  note('object as a dictionary: use Record<K, V> for fixed key/value types');
  const scores: Record<string, number> = { alice: 95, bob: 82 };
  scores.carol = 78;
  show('Object.entries(scores)', Object.entries(scores));
  show('"alice" in scores', 'alice' in scores);

  note('Map: keys can be any type, preserves insertion order, has .size');
  const m = new Map<string, number>([
    ['a', 1],
    ['b', 2],
  ]);
  m.set('c', 3);
  show('m.get("b")', m.get('b'));
  show('m.has("z")', m.has('z'));
  show('[...m.keys()]', [...m.keys()]);
  show('m.size', m.size);

  note('Set: automatic dedup; use spread for intersection/union/difference');
  const s = new Set([1, 2, 2, 3, 3, 3]);
  show('new Set([1,2,2,3,3,3])', s);
  const other = new Set([2, 3, 4]);
  show('intersection', [...s].filter((v) => other.has(v)));
  show('union', new Set([...s, ...other]));

  note('destructuring + spread: merge objects, extract the rest');
  const base = { host: 'localhost', port: 80 };
  const merged = { ...base, port: 443, tls: true }; // later overrides earlier
  show('merged', merged);
  const [first, ...rest] = nums;
  show('first / rest', [first, rest]);
}
