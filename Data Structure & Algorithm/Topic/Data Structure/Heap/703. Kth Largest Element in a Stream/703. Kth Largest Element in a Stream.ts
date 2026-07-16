// 703. Kth Largest Element in a Stream

// Design a class to find the kth largest element in a stream.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Implement KthLargest class:
// KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
// int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

// Example 1:
// Input
// ["KthLargest", "add", "add", "add", "add", "add"]
// [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
// Output
// [null, 4, 5, 5, 8, 8]

// Explanation
// KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
// kthLargest.add(3); // return 4
// kthLargest.add(5); // return 5
// kthLargest.add(10); // return 5
// kthLargest.add(9); // return 8
// kthLargest.add(4); // return 8

class KthLargest {
  heap: number[];
  k: number;

  constructor(k: number, nums: number[]) {
    this.heap = nums;
    this.k = k;
  }

  private heapify(heap: number[], length: number, current_index: number) {
    let min_index = current_index;
    const left_index = 2 * current_index + 1;
    const right_index = 2 * current_index + 2;

    if (left_index < length && heap[min_index] > heap[left_index]) {
      min_index = left_index;
    }
    if (right_index < length && heap[min_index] > heap[right_index]) {
      min_index = right_index;
    }

    if (min_index !== current_index) {
      const temp = heap[current_index];
      heap[current_index] = heap[min_index];
      heap[min_index] = temp;
      this.heapify(heap, length, min_index);
    }
  }

  add(val: number): number {
    this.heap.push(val);
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapify(this.heap, this.heap.length, i);
    }

    while (this.heap.length > this.k) {
      this.pop();
    }

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
}

// test
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3)); // 4
console.log(kthLargest.add(5)); // 5
console.log(kthLargest.add(10)); // 5
console.log(kthLargest.add(9)); // 8
console.log(kthLargest.add(4)); // 8
