// 641. Design Circular Deque

// Design your implementation of the circular double-ended queue (deque).

// Implement the MyCircularDeque class:

// MyCircularDeque(int k) Initializes the deque with a maximum size of k.
// boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
// boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
// boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
// boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
// int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty.
// int getRear() Returns the last item from Deque. Returns -1 if the deque is empty.
// boolean isEmpty() Returns true if the deque is empty, or false otherwise.
// boolean isFull() Returns true if the deque is full, or false otherwise.

// Example 1:
// Input
// ["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
// [[3], [1], [2], [3], [4], [], [], [], [4], []]
// Output
// [null, true, true, true, false, 2, true, true, true, 4]

// Explanation
// MyCircularDeque myCircularDeque = new MyCircularDeque(3);
// myCircularDeque.insertLast(1);  // return True
// myCircularDeque.insertLast(2);  // return True
// myCircularDeque.insertFront(3); // return True
// myCircularDeque.insertFront(4); // return False, the queue is full.
// myCircularDeque.getRear();      // return 2
// myCircularDeque.isFull();       // return True
// myCircularDeque.deleteLast();   // return True
// myCircularDeque.insertFront(4); // return True
// myCircularDeque.getFront();     // return 4

export class MyCircularDeque {
  size: number = 0;
  queue = new Map<number, number>();
  head: number = 0;
  tail: number = -1;

  constructor(k: number) {
    this.size = k;
    this.queue = new Map<number, number>();
    this.head = 0;
    this.tail = -1;
  }

  insertFront(value: number): boolean {
    if (!this.queue.has(this.head)) {
      this.queue.set(this.head, value);
      this.tail = this.head;
      return true;
    } else {
      const temp = this.head - 1 >= 0 ? (this.head - 1) % this.size : (this.size - 1) % this.size;
      if (this.queue.has(temp)) {
        return false;
      }
      this.head = temp;
      this.queue.set(this.head, value);
      return true;
    }
  }

  insertLast(value: number): boolean {
    if (this.queue.has((this.tail + 1) % this.size)) {
      return false;
    }
    this.tail = (this.tail + 1) % this.size;
    this.queue.set(this.tail, value);
    return true;
  }

  deleteFront(): boolean {
    if (this.queue.has(this.head)) {
      this.queue.delete(this.head);
      this.head = (this.head + 1) % this.size;
      return true;
    }
    return false;
  }

  deleteLast(): boolean {
    if (this.queue.has(this.tail)) {
      this.queue.delete(this.tail);
      this.tail = this.tail - 1 >= 0 ? (this.tail - 1) % this.size : (this.size - 1) % this.size;
      return true;
    }
    return false;
  }

  getFront(): number {
    if (this.queue.has(this.head)) {
      return this.queue.get(this.head)!;
    }
    return -1;
  }

  getRear(): number {
    if (this.queue.has(this.tail)) {
      return this.queue.get(this.tail)!;
    }
    return -1;
  }

  isEmpty(): boolean {
    if (this.queue.has(this.head)) {
      return false;
    }
    return true;
  }

  isFull(): boolean {
    if (this.queue.has((this.tail + 1) % this.size)) {
      return true;
    }
    return false;
  }
}

// test
const obj = new MyCircularDeque(8);
const param_1 = obj.insertFront(5);
console.log(obj);
const param_2 = obj.getFront();
const param_3 = obj.isEmpty();
const param_4 = obj.deleteFront();
const param_5 = obj.insertLast(3);
console.log(obj);
const param_6 = obj.getRear();
const param_7 = obj.insertLast(7);
console.log(obj);
const param_8 = obj.insertFront(7);
console.log(obj);
const param_9 = obj.deleteLast();
console.log(obj);
const param_10 = obj.insertLast(4);
const param_11 = obj.isEmpty();
