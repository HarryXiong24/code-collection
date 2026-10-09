class Heap {
  private heap: number[] = [];

  // Move the element at `index` up while it is smaller than its parent.
  // Time: O(log n), Space: O(1)
  private minHeapifyUp(index: number): void {
    const heap = this.heap;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (heap[index] >= heap[parent]) {
        break;
      }

      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  }

  // The element at `index` goes down; the smaller child comes up.
  // Time: O(log n), Space: O(1)
  private minHeapifyDown(index: number): void {
    const heap = this.heap;
    const length = heap.length;
    while (true) {
      let minIndex = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < length && heap[leftIndex] < heap[minIndex]) {
        minIndex = leftIndex;
      }
      if (rightIndex < length && heap[rightIndex] < heap[minIndex]) {
        minIndex = rightIndex;
      }

      if (minIndex === index) {
        break;
      }

      [heap[index], heap[minIndex]] = [heap[minIndex], heap[index]];
      index = minIndex;
    }
  }

  // The element at `index` goes down; the larger child comes up.
  // `length` is the current heap size, which shrinks during heap sort.
  // Time: O(log n), Space: O(1)
  private static maxHeapifyDown(nums: number[], length: number, index: number): void {
    while (true) {
      let maxIndex = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < length && nums[leftIndex] > nums[maxIndex]) {
        maxIndex = leftIndex;
      }
      if (rightIndex < length && nums[rightIndex] > nums[maxIndex]) {
        maxIndex = rightIndex;
      }

      if (maxIndex === index) {
        break;
      }

      [nums[index], nums[maxIndex]] = [nums[maxIndex], nums[index]];
      index = maxIndex;
    }
  }

  // Time: O(log n), Space: O(1)
  add(element: number): void {
    this.heap.push(element);
    this.minHeapifyUp(this.heap.length - 1);
  }

  // Time: O(1), Space: O(1)
  peek(): number | undefined {
    return this.heap[0]; // undefined when empty
  }

  // Time: O(log n), Space: O(1)
  pop(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last; // move the last element to the root
      this.minHeapifyDown(0); // then push it down to its place
    }
    return top;
  }

  size(): number {
    return this.heap.length;
  }

  // In-place heap sort, ascending. Not stable.
  // Time: O(n log n), Space: O(1)
  static sort(nums: number[]): void {
    // Phase 1: build a max-heap bottom-up, O(n)
    for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
      Heap.maxHeapifyDown(nums, nums.length, i);
    }

    // Phase 2: move the max to position i, shrink the heap, repair the root
    for (let i = nums.length - 1; i > 0; i--) {
      [nums[0], nums[i]] = [nums[i], nums[0]];
      Heap.maxHeapifyDown(nums, i, 0);
    }
  }
}

// test cases
const heap = new Heap();
heap.add(5);
heap.add(3);
heap.add(8);
heap.add(1);

console.log(heap.peek()); // 1
console.log(heap.pop()); // 1
console.log(heap.peek()); // 3
console.log(heap.size()); // 3

const nums = [5, 3, 8, 1];
Heap.sort(nums);
console.log(nums); // [1, 3, 5, 8]

// Edge cases
console.log(new Heap().pop()); // undefined
console.log(new Heap().peek()); // undefined
const empty: number[] = [];
Heap.sort(empty);
console.log(empty); // []
const dups = [2, 2, 1, 1];
Heap.sort(dups);
console.log(dups); // [1, 1, 2, 2]
