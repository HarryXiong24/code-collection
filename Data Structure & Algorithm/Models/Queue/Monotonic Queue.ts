export class MonotonicQueue {
  queue: number[];

  constructor() {
    this.queue = [];
  }

  push(value: number) {
    while (this.queue.length && this.queue[this.queue.length - 1] < value) {
      this.queue.pop();
    }
    this.queue.push(value);
  }

  pop() {
    if (this.queue.length) {
      this.queue.shift();
    }
  }

  getMax(): number | undefined {
    return this.queue.length ? this.queue[0] : undefined;
  }

  size(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}

// test
const mq = new MonotonicQueue();
mq.push(3);
mq.push(1);
mq.push(4);
mq.push(2);

console.log(mq.getMax()); // 输出: 4
mq.pop();
console.log(mq.getMax()); // 输出: 2
mq.pop();
