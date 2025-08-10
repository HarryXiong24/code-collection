// 225. Implement Stack using Queues

// Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

// Implement the MyStack class:
// void push(int x) Pushes element x to the top of the stack.
// int pop() Removes the element on the top of the stack and returns it.
// int top() Returns the element on the top of the stack.
// boolean empty() Returns true if the stack is empty, false otherwise.

// Notes:
// You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
// Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

// Example 1:
// Input
// ["MyStack", "push", "push", "top", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 2, 2, false]

// Explanation
// MyStack myStack = new MyStack();
// myStack.push(1);
// myStack.push(2);
// myStack.top(); // return 2
// myStack.pop(); // return 2
// myStack.empty(); // return False

export class MyStack {
  queue: number[];
  transit_queue: number[];

  constructor() {
    this.queue = [];
    this.transit_queue = [];
  }

  push(x: number): void {
    this.transit_queue.push(x);
    while (this.queue.length) {
      const temp = this.queue.shift()!;
      this.transit_queue.push(temp);
    }
    this.queue = this.transit_queue;
    this.transit_queue = [];
  }

  pop(): number {
    return this.queue.shift()!;
  }

  //  Returns the element on the top of the stack.
  top(): number {
    return this.queue[0];
  }

  empty(): boolean {
    if (!this.queue.length) {
      return true;
    }
    return false;
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
