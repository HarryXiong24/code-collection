import { note, show, title } from '../log.js';

/**
 * Structs / classes / interfaces — TS uses interface/type to describe shape, class to carry behavior.
 * Key points:
 *   1. interface / type describe only "data shape", erased after compilation, zero runtime cost.
 *   2. class has constructors, fields, methods, access modifiers (public/private/protected/readonly).
 *   3. implements makes a class satisfy an interface; extends does inheritance.
 *   4. TS is "structurally typed": matching shapes are compatible, regardless of name (duck typing).
 *   5. Composition over inheritance: split capabilities into interfaces and compose them.
 */

// interface: describes only shape
interface User {
  readonly id: number; // readonly: can't change after construction
  name: string;
  email?: string; // optional field
}

// an interface can be implemented by a class
interface Greeter {
  greet(): string;
}

// class: fields + methods + access modifiers. A modifier before a constructor parameter auto-declares and assigns a field of the same name
class Account implements Greeter {
  private balance: number; // accessible only inside the class

  constructor(
    public readonly owner: string, // a public readonly field, generated directly from the parameter
    initial = 0,
  ) {
    this.balance = initial;
  }

  deposit(amount: number): this {
    this.balance += amount;
    return this; // returning this supports method chaining
  }

  get summary(): string {
    return `${this.owner}: ¥${this.balance}`; // getter, accessed like a property
  }

  greet(): string {
    return `Hi, I'm ${this.owner}`;
  }
}

// inheritance: VIP extends Account
class VipAccount extends Account {
  constructor(owner: string, initial: number) {
    super(owner, initial);
  }
  override greet(): string {
    return `${super.greet()} (VIP)`;
  }
}

export function structsClassesInterfacesDemo(): void {
  title('05 Structs / classes / interfaces');

  note('an interface is just a shape: a plain object literal satisfies User, no new needed');
  const u: User = { id: 1, name: 'Harry' };
  show('u', u);

  note('structural typing: matching shapes are compatible, regardless of which declaration they came from');
  const printable: { name: string } = u; // User has name, so it's assignable to { name }
  show('printable.name', printable.name);

  note('class: method chaining, getter, access modifiers');
  const acc = new Account('Harry', 100).deposit(50).deposit(20);
  show('acc.summary', acc.summary);
  show('acc.owner', acc.owner);

  note('inheritance + override + super');
  const vip = new VipAccount('Alice', 1000).deposit(500);
  show('vip.greet()', vip.greet());
  show('vip.summary', vip.summary);
  show('vip instanceof Account', vip instanceof Account);
}
