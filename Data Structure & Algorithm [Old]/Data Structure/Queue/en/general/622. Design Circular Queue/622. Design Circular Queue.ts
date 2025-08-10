// 622. Design Circular Queue

// Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

// One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

// Implement the MyCircularQueue class:

// MyCircularQueue(k) Initializes the object with the size of the queue to be k.
// int Front() Gets the front item from the queue. If the queue is empty, return -1.
// int Rear() Gets the last item from the queue. If the queue is empty, return -1.
// boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
// boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
// boolean isEmpty() Checks whether the circular queue is empty or not.
// boolean isFull() Checks whether the circular queue is full or not.
// You must solve the problem without using the built-in queue data structure in your programming language.

// Example 1:

// Input
// ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
// [[3], [1], [2], [3], [4], [], [], [], [4], []]
// Output
// [null, true, true, true, false, 3, true, true, true, 4]

// Explanation
// MyCircularQueue myCircularQueue = new MyCircularQueue(3);
// myCircularQueue.enQueue(1); // return True
// myCircularQueue.enQueue(2); // return True
// myCircularQueue.enQueue(3); // return True
// myCircularQueue.enQueue(4); // return False
// myCircularQueue.Rear();     // return 3
// myCircularQueue.isFull();   // return True
// myCircularQueue.deQueue();  // return True
// myCircularQueue.enQueue(4); // return True
// myCircularQueue.Rear();     // return 4

export class MyCircularQueue {
  size: number;
  head: number = 0;
  tail: number = -1;
  queue = new Map<number, number>();

  constructor(k: number) {
    this.size = k;
    this.queue = new Map<number, number>();
    this.head = 0;
    this.tail = -1;
  }

  // Inserts an element into the circular queue. Return true if the operation is successful.
  enQueue(value: number): boolean {
    if ((this.tail + 1) % this.size === this.head && this.queue.has(this.head)) {
      return false;
    }
    this.tail = (this.tail + 1) % this.size;
    this.queue.set(this.tail, value);
    return true;
  }

  // Deletes an element from the circular queue. Return true if the operation is successful.
  deQueue(): boolean {
    if (!this.queue.has(this.head)) {
      return false;
    }
    this.queue.delete(this.head);
    this.head = (this.head + 1) % this.size;
    return true;
  }

  // Gets the front item from the queue. If the queue is empty, return -1.
  Front(): number {
    if (this.queue.has(this.head)) {
      return this.queue.get(this.head)!;
    } else {
      return -1;
    }
  }

  // Gets the last item from the queue. If the queue is empty, return -1.
  Rear(): number {
    if (this.queue.has(this.tail)) {
      return this.queue.get(this.tail)!;
    } else {
      return -1;
    }
  }

  // Checks whether the circular queue is empty or not.
  isEmpty(): boolean {
    if (!this.queue.has(this.head)) {
      return true;
    } else {
      return false;
    }
  }

  // Checks whether the circular queue is full or not.
  isFull(): boolean {
    if ((this.tail + 1) % this.size === this.head && this.queue.has(this.head)) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

// test
const obj = new MyCircularQueue(3);
const param_1 = obj.enQueue(1);
const param_2 = obj.enQueue(2);
const param_3 = obj.enQueue(3);
const param_4 = obj.enQueue(4);
console.log(param_4);
console.log(obj);
const param_5 = obj.Rear();
console.log(param_5);
const param_6 = obj.isFull();
console.log(param_6);
const param_7 = obj.deQueue();
console.log(obj);
const param_8 = obj.enQueue(4);
console.log(obj);
const param_9 = obj.Rear();
console.log(param_9);

const obj2 = new MyCircularQueue(8);
const param_11 = obj2.enQueue(3);
const param_22 = obj2.enQueue(9);
const param_33 = obj2.enQueue(5);
const param_44 = obj2.enQueue(0);
console.log(obj2);
const param_55 = obj2.deQueue();
const param_66 = obj2.deQueue();
console.log(obj2);
const param_77 = obj2.isEmpty();
const param_88 = obj2.isEmpty();
console.log(obj2);
console.log(obj2.tail);
console.log(obj2.queue);
const param_99 = obj2.Rear();
console.log(param_99);
const param_1010 = obj2.Rear();
console.log(param_1010);
const param_1111 = obj2.deQueue();
