// 232. Implement Queue using Stacks

// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

// Implement the MyQueue class:
// void push(int x) Pushes element x to the back of the queue.
// int pop() Removes the element from the front of the queue and returns it.
// int peek() Returns the element at the front of the queue.
// boolean empty() Returns true if the queue is empty, false otherwise.

// Notes:
// You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
// Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

// Example 1:
// Input
// ["MyQueue", "push", "push", "peek", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 1, 1, false]
// Explanation
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false

export class MyQueue {
  in_stack: number[];
  out_stack: number[];

  constructor() {
    this.in_stack = [];
    this.out_stack = [];
  }

  push(x: number): void {
    this.in_stack.push(x);
  }

  pop(): number {
    if (this.out_stack.length) {
      return this.out_stack.pop()!;
    }
    while (this.in_stack.length) {
      const temp = this.in_stack.pop()!;
      this.out_stack.push(temp);
    }
    return this.out_stack.pop()!;
  }

  // Returns the element at the front of the queue.
  peek(): number {
    if (this.out_stack.length) {
      return this.out_stack[this.out_stack.length - 1];
    }
    while (this.in_stack.length) {
      const temp = this.in_stack.pop()!;
      this.out_stack.push(temp);
    }
    return this.out_stack[this.out_stack.length - 1];
  }

  empty(): boolean {
    if (!this.in_stack.length && !this.out_stack.length) {
      return true;
    }
    return false;
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
