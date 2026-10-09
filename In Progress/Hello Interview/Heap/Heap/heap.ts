class Heap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  private siftUp(heap: number[], index: number) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (heap[index] >= heap[parent]) {
        break;
      }

      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  }

  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  private siftDownMin(heap: number[], length: number, index: number) {
    while (true) {
      let minIndex = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < length && heap[minIndex] > heap[leftIndex]) {
        minIndex = leftIndex;
      }
      if (rightIndex < length && heap[minIndex] > heap[rightIndex]) {
        minIndex = rightIndex;
      }

      if (index === minIndex) {
        break;
      }

      [heap[index], heap[minIndex]] = [heap[minIndex], heap[index]];
      index = minIndex;
    }
  }

  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  private siftDownMax(heap: number[], length: number, index: number) {
    while (true) {
      let maxIndex = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < length && heap[maxIndex] < heap[leftIndex]) {
        maxIndex = leftIndex;
      }
      if (rightIndex < length && heap[maxIndex] < heap[rightIndex]) {
        maxIndex = rightIndex;
      }

      if (index === maxIndex) {
        break;
      }

      [heap[index], heap[maxIndex]] = [heap[maxIndex], heap[index]];
      index = maxIndex;
    }
  }

  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  add(element: number) {
    this.heap.push(element);
    this.siftUp(this.heap, this.heap.length - 1);
  }

  // Time Complexity: O(1)
  // Space Complexity: O(1)
  peek(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    return this.heap[0];
  }

  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  pop(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDownMin(this.heap, this.heap.length, 0);
    }
    return top;
  }

  size(): number {
    return this.heap.length;
  }

  // Time Complexity: O(n log n)
  // Space Complexity: O(1)
  sort(nums: number[]) {
    for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
      this.siftDownMax(nums, nums.length, i);
    }

    for (let i = nums.length - 1; i >= 0; i--) {
      [nums[0], nums[i]] = [nums[i], nums[0]];
      this.siftDownMax(nums, i, 0);
    }
  }
}

// test
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
heap.sort(nums);
console.log(nums); // [1, 3, 5, 8]
