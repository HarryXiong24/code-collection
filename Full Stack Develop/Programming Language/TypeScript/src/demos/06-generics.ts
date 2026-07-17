import { note, show, title } from '../log.js';

/**
 * 泛型 —— 让类型「参数化」，写一次逻辑适配多种类型且不丢类型信息。
 * 要点：
 *   1. <T> 是类型参数，调用时可显式传，也可由实参推断。
 *   2. 约束 `<T extends X>` 限定 T 至少具备某些能力。
 *   3. 泛型可用于函数、类、接口、类型别名。
 *   4. keyof + 索引类型做到「类型安全地按 key 取值」。
 *   5. 默认类型参数 `<T = string>`。
 */

// 泛型函数：进什么类型，出什么类型
function identity<T>(x: T): T {
  return x;
}

// 约束：T 必须有 length 属性
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

// keyof + 索引：obj[key] 的类型正好是对应字段类型
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 泛型类：一个类型安全的栈
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
  title('06 泛型');

  note('泛型函数：类型随实参推断');
  show('identity<number>(42)', identity(42));
  show('identity("hi")', identity('hi'));

  note('约束：只要有 length 就能比，string 和数组都行');
  show('longest("abcd", "xy")', longest('abcd', 'xy'));
  show('longest([1,2], [3,4,5])', longest([1, 2], [3, 4, 5]));

  note('keyof：按 key 取值且类型精确（拼错 key 编译报错）');
  const user = { id: 1, name: 'Harry', active: true };
  show('pluck(user, "name")', pluck(user, 'name'));
  show('pluck(user, "active")', pluck(user, 'active'));

  note('泛型类：Stack<number> 只接受 number');
  const st = new Stack<number>();
  st.push(1);
  st.push(2);
  show('stack.pop()', st.pop());
  show('stack.size', st.size);

  note('内置工具类型基于泛型：Partial / Pick / Readonly …');
  type User = typeof user;
  const patch: Partial<User> = { name: 'Alice' }; // 所有字段变可选
  show('Partial patch', patch);
}
