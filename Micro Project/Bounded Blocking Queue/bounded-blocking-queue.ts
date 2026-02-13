type Resolver<T> = (value: T | null) => void;

class BoundedBlockingQueue<T> {
  private queue: T[];
  private capacity: number;
  private isClosed: boolean;

  // 这里的两个数组相当于 Go 里的 sync.Cond 等待队列
  private emptyWaiters: Resolver<T>[];
  private fullWaiters: Resolver<T>[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.queue = [];
    this.isClosed = false;

    this.emptyWaiters = [];
    this.fullWaiters = [];
  }

  async enQueue(value: T): Promise<boolean> {
    if (this.isClosed) {
      return false;
    }

    if (this.queue.length === this.capacity) {
      await new Promise((resolve) => {
        this.fullWaiters.push(resolve);
      });

      if (this.isClosed) {
        return false;
      }
    }

    this.queue.push(value);

    // replace signal in go
    if (this.emptyWaiters.length > 0) {
      const resolve = this.emptyWaiters.shift()!;
      resolve(this.queue.shift()!);
    }

    return true;
  }

  async deQueue(): Promise<T | null> {
    if (this.queue.length === 0) {
      await new Promise((resolve) => {
        this.emptyWaiters.push(resolve);
      });
    }

    if (this.queue.length === 0 && this.isClosed) {
      return null;
    }

    const ele = this.queue.shift()!;

    if (this.fullWaiters.length > 0) {
      const resolve = this.fullWaiters.shift()!;
      resolve(ele);
    }

    return ele;
  }

  close() {
    this.isClosed = true;
    while (this.emptyWaiters.length > 0) {
      const resolve = this.emptyWaiters.shift()!;
      resolve(null);
    }
    while (this.fullWaiters.length > 0) {
      const resolve = this.fullWaiters.shift()!;
      resolve(null);
    }
  }
}

// test
async function test() {
  const queue = new BoundedBlockingQueue<number>(2);

  queue.enQueue(5);
  queue.enQueue(10);

  const res1 = await queue.deQueue();
  console.log(res1);

  const res2 = await queue.deQueue();
  console.log(res2);

  const res3 = await queue.deQueue();
  console.log(res3);
}

test();
