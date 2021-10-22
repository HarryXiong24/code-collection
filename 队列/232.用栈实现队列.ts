// 232 用栈实现队列

/**
 * 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）
 * 实现 MyQueue 类：
 * void push(int x) 将元素 x 推到队列的末尾
 * int pop() 从队列的开头移除并返回元素
 * int peek() 返回队列开头的元素
 * boolean empty() 如果队列为空，返回 true ；否则，返回 false
 */

export class MyQueue {
  // 输入栈
  private inStack: number[] = [];
  // 输出栈
  private outStack: number[] = [];
  constructor() {}

  push(x: number): void {
    this.inStack.push(x);
  }

  pop(): number {
    // 如果输出栈里面没有元素，则需要将输入栈里的元素转移过来
    // 果输出栈里面有元素，则要把输出栈的元素全部pop完，才能将输入栈里的元素转移过来
    if (!this.outStack.length) {
      this.inToOut();
    }
    return this.outStack.pop()!;
  }

  // peek 和 pop 原理一致
  peek(): number {
    if (!this.outStack.length) {
      this.inToOut();
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }

  private inToOut(): void {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop()!);
    }
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
