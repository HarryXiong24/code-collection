import { note, show, title } from '../log.js';

/**
 * 迭代器与生成器 —— 惰性产生序列，用多少算多少。
 * 要点：
 *   1. 生成器函数 function* + yield，调用返回一个惰性的迭代器。
 *   2. 可迭代协议：实现 [Symbol.iterator]() 的对象能被 for...of / 展开 消费。
 *   3. 惰性：值在被取时才计算，因此可以表示「无限序列」。
 *   4. yield* 委托给另一个可迭代对象，做拼接/递归。
 *   5. for...of、展开 ...、解构都基于同一套迭代协议。
 */

// 生成器函数：像写普通函数一样，用 yield 逐个吐值
function* range(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) yield i;
}

// 无限序列：因为惰性，不会真的算到天荒地老
function* fib(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 惰性变换：包一层生成器，只有下游要值时才算
function* mapGen<T, R>(src: Iterable<T>, fn: (v: T) => R): Generator<R> {
  for (const v of src) yield fn(v);
}

// yield* 委托：把多个可迭代对象拼接成一个
function* concat<T>(...iters: Iterable<T>[]): Generator<T> {
  for (const it of iters) yield* it;
}

// 从任意可迭代对象取前 n 个
function take<T>(src: Iterable<T>, n: number): T[] {
  const out: T[] = [];
  for (const v of src) {
    if (out.length >= n) break;
    out.push(v);
  }
  return out;
}

// 自定义可迭代类：实现 [Symbol.iterator] 就能被 for...of 消费
class Countdown implements Iterable<number> {
  constructor(private readonly from: number) {}
  *[Symbol.iterator](): Iterator<number> {
    for (let i = this.from; i > 0; i--) yield i;
  }
}

export function iteratorsDemo(): void {
  title('13 迭代器与生成器');

  note('生成器函数：用 for...of 或展开消费');
  show('[...range(0, 5)]', [...range(0, 5)]);
  show('[...range(0, 10, 2)]', [...range(0, 10, 2)]);

  note('无限序列 + take：惰性求值，只算需要的那部分');
  show('take(fib(), 10)', take(fib(), 10));

  note('惰性流水线：map 也是生成器，不产生中间数组');
  const pipeline = mapGen(
    mapGen(fib(), (n) => n * n), // 平方
    (n) => `#${n}`, // 加前缀
  );
  show('fib 平方前 5 个', take(pipeline, 5));

  note('yield* 委托：拼接多个可迭代对象');
  show('concat(range,数组)', [...concat(range(0, 3), [100, 200])]);

  note('自定义可迭代类：实现 [Symbol.iterator]');
  show('[...new Countdown(5)]', [...new Countdown(5)]);

  note('手动驱动迭代器：next() 返回 { value, done }');
  const it = range(0, 2);
  show('it.next()', it.next());
  show('it.next()', it.next());
  show('it.next()', it.next()); // done: true
}
