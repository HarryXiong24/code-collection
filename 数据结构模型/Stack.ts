// 栈

/**
 * 功能
 * 1.入栈
 * 2.出栈
 * 3.返回栈顶元素
 * 4.判断栈是否为空
 * 5.返回栈里元素的个数
 * 6.清空栈
 */

export class Stack<T> {
  public items: T[];

  constructor() {
    this.items = [];
  }

  // 入栈
  push(value: T): void {
    this.items.push(value);
  }

  // 出栈
  pop(): T {
    return this.items.pop()!;
  }

  // 返回栈顶元素
  peek(): T | null {
    if (this.isEmpty() === true) {
      return null;
    } else {
      return this.items[this.items.length - 1];
    }
  }

  // 判断栈是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 返回栈里元素的个数
  size(): number {
    return this.items.length;
  }

  // 清空栈
  clear(): void {
    this.items = [];
    this.items.length = 0;
  }
}

// test
const stack = new Stack();
console.log(stack.isEmpty());
console.log(stack.peek());
stack.push('1');
stack.push('5');
console.log(stack.peek());
console.log(stack.size());
