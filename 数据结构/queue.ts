// 队列

/*
 * 功能
 * 1.入队
 * 2.出队并返回出队元素
 * 3.查看队首元素
 * 4.判断队列是否为空
 * 5.返回队列包含的元素个数
 * 6.清空队列
 */

export class Queue<T> {
  public head: number;
  public tail: number;
  public items: Map<number, T>;

  // 一开始没有元素，首尾都指向 0
  constructor() {
    this.head = 0;
    this.tail = 0;
    this.items = new Map<number, T>();
  }

  // 入队
  in(value: T): void {
    this.items.set(this.tail, value);
    this.tail++;
  }

  // 出队并返回出队元素
  out(): T | null {
    if (this.isEmpty() === false) {
      const value: T = this.items.get(this.head)!;
      this.items.delete(this.head);
      this.head++;
      return value;
    } else {
      return null;
    }
  }

  // 查看队首元素
  peek(): T | null {
    if (this.isEmpty() === false) {
      return this.items.get(this.head)!;
    } else {
      return null
    }
  }

  // 判断队列是否为空
  isEmpty(): boolean {
    return this.items.size === 0;
    // or
    // return this.head === this.tail;
  }

  // 返回队列包含的元素个数
  size(): number {
    return this.items.size;
  }

  // 清空队列
  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.items = new Map<number, T>();
  }
}

// test
let queue = new Queue<number>();
console.log(queue.isEmpty());
queue.in(2);
console.log(queue.isEmpty());
queue.in(5);
queue.in(8);
console.log(queue.size());
console.log(queue.peek());
console.log(queue.out());
console.log(queue.peek());
console.log(queue.size());
