import { note, show, title } from '../log.js';

/**
 * Decorators / metaprogramming — TS 5.0+ supports TC39 standard decorators (no experimentalDecorators needed).
 * Key points:
 *   1. A decorator is a function that "rewrites a class/method/field at definition time".
 *   2. A method decorator has the signature (value, context) and can return a replacement method.
 *   3. Common uses: logging, timing, caching, permissions, route registration.
 *   4. Go uses struct tag + reflect, Python uses @decorator to achieve the same effect — read them side by side.
 *   5. Decorators decouple "cross-cutting concerns" from business logic.
 */

// record calls to decorated methods, for the demo to show
const callLog: string[] = [];

// method decorator: wrap a layer, record before and after the call
function logged(original: (...args: any[]) => any, context: ClassMethodDecoratorContext) {
  const name = String(context.name);
  return function (this: unknown, ...args: any[]) {
    const result = original.call(this, ...args);
    callLog.push(`${name}(${args.join(', ')}) → ${result}`);
    return result;
  };
}

// method decorator: simple result cache (memoization)
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

// class decorator: seal the prototype, forbidding later property additions
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
  title('10 Decorators / metaprogramming');

  const calc = new Calculator();

  note('@logged: method calls are recorded automatically, with no logging statement in the business code');
  show('calc.add(2, 3)', calc.add(2, 3));
  show('calc.add(10, 20)', calc.add(10, 20));

  note('@memoize: repeated subproblems of recursive fib hit the cache directly');
  show('calc.fib(10)', calc.fib(10));

  note('the call log accumulated by the decorators');
  for (const line of callLog.slice(0, 4)) note(line);

  note('@sealed (class decorator): the prototype is sealed, so adding a method dynamically fails');
  show('Object.isSealed(prototype)', Object.isSealed(Calculator.prototype));
}
