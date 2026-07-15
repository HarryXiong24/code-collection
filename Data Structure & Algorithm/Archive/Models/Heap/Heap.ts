// Heap

class MaxHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  private heapify(heap: number[], length: number, current_index: number) {
    let max_index = current_index;
    const left_index = 2 * current_index + 1;
    const right_index = 2 * current_index + 2;

    if (left_index < length && heap[max_index] < heap[left_index]) {
      max_index = left_index;
    }
    if (right_index < length && heap[max_index] < heap[right_index]) {
      max_index = right_index;
    }

    if (max_index !== current_index) {
      const temp = heap[current_index];
      heap[current_index] = heap[max_index];
      heap[max_index] = temp;
      this.heapify(heap, length, max_index);
    }
  }

  // add element
  // Time Complexity: O(log N)
  // Space Complexity: O(1)
  add(element: number) {
    this.heap.push(element);
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapify(this.heap, this.heap.length, i);
    }
  }

  // get the top element of Heap
  // Time Complexity: O(1)
  // Space Complexity: O(1)
  peek(): number {
    return this.heap[0];
  }

  // delete the top element of Heap
  // Time Complexity: O(log N)
  // Space Complexity: O(1)
  pop(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    const temp = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap[this.heap.length - 1] = temp;
    const top = this.heap.pop();
    this.heapify(this.heap, this.heap.length, 0);
    return top;
  }

  // get size of heap
  // Time Complexity: O(1)
  // Space Complexity: O(1)
  size(): number {
    return this.heap.length;
  }

  // print
  print() {
    console.log(this.heap);
  }

  // transfer MaxHeap to MinHeap
  transferToMinHeap() {
    let minHeap = this.heap.map((item) => item * -1);
    for (let i = Math.floor(minHeap.length / 2) - 1; i >= 0; i--) {
      this.heapify(minHeap, minHeap.length, i);
    }
    minHeap = minHeap.map((item) => item * -1);
    return minHeap;
  }
}

// test
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);
maxHeap.print(); // [3,1,2]
console.log(maxHeap.size()); // 3
console.log(maxHeap.peek()); // 3
console.log(maxHeap.pop()); // 3
console.log(maxHeap.pop()); // 2
console.log(maxHeap.pop()); // 1
maxHeap.add(4);
maxHeap.add(5);
maxHeap.print(); // [5,4]
maxHeap.add(8);
maxHeap.add(2);
maxHeap.add(9);
maxHeap.add(4);
maxHeap.print();
console.log(maxHeap.transferToMinHeap());
