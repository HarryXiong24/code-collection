import { note, show, title } from '../log.js';

/**
 * 函数 —— 参数、默认值、可变参数、返回类型、闭包、高阶函数。
 * 要点：
 *   1. 参数和返回值都可标注类型；返回值一般靠推断。
 *   2. 可选参数 `?`、默认值 `=`、剩余参数 `...args`。
 *   3. 箭头函数不绑定自己的 this，语法更短。
 *   4. 函数是一等公民：可作参数、可作返回值 → 高阶函数。
 *   5. 函数重载用多个签名 + 一个实现体表达。
 */

// 具名函数：完整标注
function add(a: number, b: number): number {
  return a + b;
}

// 可选参数 + 默认值 + 剩余参数
function greet(name: string, greeting = 'Hi', ...tags: string[]): string {
  const suffix = tags.length ? ` [${tags.join(', ')}]` : '';
  return `${greeting}, ${name}${suffix}`;
}

// 高阶函数：接收函数、返回函数（闭包记住 factor）
function multiplier(factor: number): (n: number) => number {
  return (n) => n * factor;
}

// 函数重载：对外暴露两种签名，对内一个实现
function len(x: string): number;
function len(x: unknown[]): number;
function len(x: string | unknown[]): number {
  return x.length;
}

export function functionsDemo(): void {
  title('03 函数');

  show('add(2, 3)', add(2, 3));

  note('默认值 / 可选 / 剩余参数');
  show('greet("Harry")', greet('Harry'));
  show('greet("Harry", "Hello")', greet('Harry', 'Hello'));
  show('greet("Harry", "Hey", "vip", "new")', greet('Harry', 'Hey', 'vip', 'new'));

  note('箭头函数：表达式体自动 return，常做回调');
  const square = (n: number): number => n * n;
  show('square(9)', square(9));

  note('闭包：返回的函数记住了外层变量 factor');
  const triple = multiplier(3);
  show('triple(10)', triple(10));

  note('高阶函数：把行为当参数传进去');
  const apply = <T, R>(value: T, fn: (v: T) => R): R => fn(value);
  show('apply(5, square)', apply(5, square));

  note('函数重载：同名不同签名，实现里再分派');
  show('len("hello")', len('hello'));
  show('len([1, 2, 3])', len([1, 2, 3]));

  note('解构参数 + 默认值，常用于「配置对象」入参');
  const connect = ({ host = 'localhost', port = 5432 }: { host?: string; port?: number }): string =>
    `${host}:${port}`;
  show('connect({ port: 6379 })', connect({ port: 6379 }));
}
