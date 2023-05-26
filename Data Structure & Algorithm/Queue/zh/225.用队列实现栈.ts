// 225 用队列实现栈

/**
 * 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。
 * 实现 MyStack 类：
 * void push(int x) 将元素 x 压入栈顶。
 * int pop() 移除并返回栈顶元素。
 * int top() 返回栈顶元素。
 * boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
 */

/**
 * 思路:
 * 设置两个队列queue1、queue2, 把每次push的元素放入queue2中
 * 然后再将queue1队列出队，依次放入queue2中
 * 这样新入队元素就排在了queue2的队首，最后我们将queue1和queue2交换
 */
export class MyStack {
  private queue1: number[] = [];
  private queue2: number[] = [];

  constructor() {}

  push(x: number): void {
    this.queue2.push(x);
    while (this.queue1.length) {
      this.queue2.push(this.queue1.shift()!);
    }
    this.queue1 = this.queue2;
    this.queue2 = [];
  }

  pop(): number {
    return this.queue1.shift()!;
  }

  top(): number {
    return this.queue1[0];
  }

  empty(): boolean {
    return this.queue1.length === 0;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
