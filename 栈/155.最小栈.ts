// 155 最小栈

/*
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 * push(x) —— 将元素 x 推入栈中
 * pop() —— 删除栈顶的元素
 * top() —— 获取栈顶元素
 * getMin() —— 检索栈中的最小元素
 */

export class MinStack {
  stack: number[];

  constructor() {
    this.stack = [];
  }

  push(val: number): void {
    this.stack.push(val);
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    let min = this.stack[0];
    this.stack.forEach((val) => {
      if (val < min) {
        min = val;
      }
    });
    return min;
  }
}

// test
let stack = new MinStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
console.log(stack.top());
console.log(stack.getMin());
