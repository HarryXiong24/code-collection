import { note, show, title } from '../log.js';

/**
 * 结构体 / 类 / 接口 —— TS 用 interface/type 描述形状，用 class 承载行为。
 * 要点：
 *   1. interface / type 只描述「数据形状」，编译后被擦除，零运行时成本。
 *   2. class 有构造器、字段、方法、访问修饰符（public/private/protected/readonly）。
 *   3. implements 让类满足接口；extends 做继承。
 *   4. TS 是「结构化类型」：形状对得上就算兼容，不看名字（duck typing）。
 *   5. 组合优于继承：把能力拆成接口再拼装。
 */

// 接口：只描述形状
interface User {
  readonly id: number; // readonly：构造后不可改
  name: string;
  email?: string; // 可选字段
}

// 接口可被类实现
interface Greeter {
  greet(): string;
}

// 类：字段 + 方法 + 访问修饰符。构造参数前加修饰符 = 自动声明并赋值同名字段
class Account implements Greeter {
  private balance: number; // 只能类内部访问

  constructor(
    public readonly owner: string, // public readonly 字段，直接由参数生成
    initial = 0,
  ) {
    this.balance = initial;
  }

  deposit(amount: number): this {
    this.balance += amount;
    return this; // 返回 this 支持链式调用
  }

  get summary(): string {
    return `${this.owner}: ¥${this.balance}`; // getter，像属性一样访问
  }

  greet(): string {
    return `Hi, I'm ${this.owner}`;
  }
}

// 继承：VIP 扩展 Account
class VipAccount extends Account {
  constructor(owner: string, initial: number) {
    super(owner, initial);
  }
  override greet(): string {
    return `${super.greet()} (VIP)`;
  }
}

export function structsClassesInterfacesDemo(): void {
  title('05 结构体 / 类 / 接口');

  note('接口只是形状：普通对象字面量就能满足 User，无需 new');
  const u: User = { id: 1, name: 'Harry' };
  show('u', u);

  note('结构化类型：形状对得上就兼容，不看是不是同一个声明');
  const printable: { name: string } = u; // User 有 name，能赋给 { name }
  show('printable.name', printable.name);

  note('类：链式调用、getter、访问修饰符');
  const acc = new Account('Harry', 100).deposit(50).deposit(20);
  show('acc.summary', acc.summary);
  show('acc.owner', acc.owner);

  note('继承 + override + super');
  const vip = new VipAccount('Alice', 1000).deposit(500);
  show('vip.greet()', vip.greet());
  show('vip.summary', vip.summary);
  show('vip instanceof Account', vip instanceof Account);
}
