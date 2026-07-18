import { note, show, title } from '../log.js';

/**
 * Iterators & generators — lazily produce sequences, computing only as much as you use.
 * Key points:
 *   1. A generator function function* + yield; calling it returns a lazy iterator.
 *   2. The iterable protocol: an object implementing [Symbol.iterator]() can be consumed by for...of / spread.
 *   3. Lazy: values are computed when pulled, so it can represent an "infinite sequence".
 *   4. yield* delegates to another iterable, for concatenation/recursion.
 *   5. for...of, spread ..., and destructuring are all based on the same iteration protocol.
 */

// generator function: written like an ordinary function, emitting values one at a time with yield
function* range(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) yield i;
}

// infinite sequence: because it's lazy, it won't actually compute forever
function* fib(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// lazy transform: wrap a generator layer, computed only when the consumer wants a value
function* mapGen<T, R>(src: Iterable<T>, fn: (v: T) => R): Generator<R> {
  for (const v of src) yield fn(v);
}

// yield* delegation: splice multiple iterables into one
function* concat<T>(...iters: Iterable<T>[]): Generator<T> {
  for (const it of iters) yield* it;
}

// take the first n from any iterable
function take<T>(src: Iterable<T>, n: number): T[] {
  const out: T[] = [];
  for (const v of src) {
    if (out.length >= n) break;
    out.push(v);
  }
  return out;
}

// custom iterable class: implementing [Symbol.iterator] makes it consumable by for...of
class Countdown implements Iterable<number> {
  constructor(private readonly from: number) {}
  *[Symbol.iterator](): Iterator<number> {
    for (let i = this.from; i > 0; i--) yield i;
  }
}

export function iteratorsDemo(): void {
  title('13 Iterators & generators');

  note('generator function: consume with for...of or spread');
  show('[...range(0, 5)]', [...range(0, 5)]);
  show('[...range(0, 10, 2)]', [...range(0, 10, 2)]);

  note('infinite sequence + take: lazy evaluation, computes only the part you need');
  show('take(fib(), 10)', take(fib(), 10));

  note('lazy pipeline: map is also a generator, produces no intermediate array');
  const pipeline = mapGen(
    mapGen(fib(), (n) => n * n), // square
    (n) => `#${n}`, // add a prefix
  );
  show('first 5 fib squares', take(pipeline, 5));

  note('yield* delegation: splice multiple iterables');
  show('concat(range, array)', [...concat(range(0, 3), [100, 200])]);

  note('custom iterable class: implement [Symbol.iterator]');
  show('[...new Countdown(5)]', [...new Countdown(5)]);

  note('manually drive an iterator: next() returns { value, done }');
  const it = range(0, 2);
  show('it.next()', it.next());
  show('it.next()', it.next());
  show('it.next()', it.next()); // done: true
}
