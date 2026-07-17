import { note, show, title } from '../log.js';

/**
 * 高级类型 —— TS 类型系统的招牌能力：联合、字面量、收窄、映射、条件、守卫。
 * 要点：
 *   1. 联合类型 A | B、交叉类型 A & B。
 *   2. 字面量类型 + 联合 = 轻量枚举（'red' | 'green'）。
 *   3. 类型收窄：typeof / in / instanceof / 自定义类型守卫。
 *   4. 映射类型 { [K in keyof T]: ... } 与条件类型 T extends U ? X : Y。
 *   5. enum 是少数「有运行时产物」的类型特性。
 */

// 字面量联合当枚举用（无运行时开销）
type Direction = 'up' | 'down' | 'left' | 'right';

// 真 enum：会生成运行时对象，可反查
enum Status {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
}

// 自定义类型守卫：返回 x is Cat，让编译器在 true 分支收窄
interface Cat {
  meow(): string;
}
interface Dog {
  bark(): string;
}
function isCat(a: Cat | Dog): a is Cat {
  return 'meow' in a;
}

// 条件类型 + 映射类型
type Nullable<T> = { [K in keyof T]: T[K] | null };

export function advancedTypesDemo(): void {
  title('09 高级类型');

  note('字面量联合：只能取这几个值，传错编译报错');
  const move = (d: Direction): string => `move ${d}`;
  show('move("up")', move('up'));

  note('enum 有运行时产物，可正查反查');
  show('Status.Active', Status.Active);
  show('Object.values(Status)', Object.values(Status));

  note('类型收窄：typeof 区分联合成员');
  const format = (v: string | number): string => (typeof v === 'number' ? v.toFixed(1) : v.toUpperCase());
  show('format(3.14159)', format(3.14159));
  show('format("hi")', format('hi'));

  note('自定义类型守卫：a is Cat，true 分支里能安全调 meow()');
  const animal: Cat | Dog = { meow: () => '喵' };
  show('isCat 分派', isCat(animal) ? animal.meow() : (animal as Dog).bark());

  note('交叉类型 A & B：同时拥有两边字段');
  type WithId = { id: number };
  type WithName = { name: string };
  const entity: WithId & WithName = { id: 1, name: 'Harry' };
  show('A & B', entity);

  note('映射类型：把每个字段都变成 T | null');
  const draft: Nullable<WithName> = { name: null };
  show('Nullable<WithName>', draft);
}
