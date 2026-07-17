import { note, show, title } from '../log.js';

/**
 * 装饰器 / 元编程 —— TS 5.0+ 支持 TC39 标准装饰器（无需 experimentalDecorators）。
 * 要点：
 *   1. 装饰器就是「在定义时改写类/方法/字段」的函数。
 *   2. 方法装饰器签名 (value, context)，可返回替换后的方法。
 *   3. 常见用途：日志、计时、缓存、权限、注册路由。
 *   4. Go 用 struct tag + reflect、Python 用 @decorator 达到同类效果 —— 横向对照看。
 *   5. 装饰器让「横切关注点」和业务逻辑解耦。
 */

// 记录被装饰方法的调用，供 demo 展示
const callLog: string[] = [];

// 方法装饰器：包一层，调用前后记录
function logged(original: (...args: any[]) => any, context: ClassMethodDecoratorContext) {
  const name = String(context.name);
  return function (this: unknown, ...args: any[]) {
    const result = original.call(this, ...args);
    callLog.push(`${name}(${args.join(', ')}) → ${result}`);
    return result;
  };
}

// 方法装饰器：简单结果缓存（记忆化）
function memoize(original: (...args: any[]) => any, _context: ClassMethodDecoratorContext) {
  const cache = new Map<string, any>();
  return function (this: unknown, ...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      callLog.push(`cache hit ${key}`);
      return cache.get(key);
    }
    const result = original.call(this, ...args);
    cache.set(key, result);
    return result;
  };
}

// 类装饰器：封住原型，禁止后续加属性
function sealed<T extends new (...args: any[]) => object>(target: T, _context: ClassDecoratorContext): T {
  Object.seal(target.prototype);
  return target;
}

@sealed
class Calculator {
  @logged
  add(a: number, b: number): number {
    return a + b;
  }

  @memoize
  fib(n: number): number {
    return n < 2 ? n : this.fib(n - 1) + this.fib(n - 2);
  }
}

export function decoratorsDemo(): void {
  title('10 装饰器 / 元编程');

  const calc = new Calculator();

  note('@logged：方法调用被自动记录，业务代码里没有任何日志语句');
  show('calc.add(2, 3)', calc.add(2, 3));
  show('calc.add(10, 20)', calc.add(10, 20));

  note('@memoize：递归 fib 的重复子问题直接命中缓存');
  show('calc.fib(10)', calc.fib(10));

  note('装饰器攒下来的调用日志');
  for (const line of callLog.slice(0, 4)) note(line);

  note('@sealed（类装饰器）：原型被 seal，动态加方法失败');
  show('Object.isSealed(prototype)', Object.isSealed(Calculator.prototype));
}
