// 295. Find Median from Data Stream

// The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

// For example, for arr = [2,3,4], the median is 3.
// For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
// Implement the MedianFinder class:

// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

// Example 1:
// Input
// ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
// [[], [1], [2], [], [3], []]
// Output
// [null, null, null, 1.5, null, 2.0]
// Explanation
// MedianFinder medianFinder = new MedianFinder();
// medianFinder.addNum(1);    // arr = [1]
// medianFinder.addNum(2);    // arr = [1, 2]
// medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
// medianFinder.addNum(3);    // arr[1, 2, 3]
// medianFinder.findMedian(); // return 2.0

export class MedianFinder {
  small: number[];
  large: number[];

  constructor() {
    this.small = [];
    this.large = [];
  }

  minHeapify(nums: number[], length: number, current_index: number) {
    let min_index = current_index;
    const left_index = 2 * current_index + 1;
    const right_index = 2 * current_index + 2;

    if (left_index < length && nums[min_index] > nums[left_index]) {
      min_index = left_index;
    }
    if (right_index < length && nums[min_index] > nums[right_index]) {
      min_index = right_index;
    }

    if (min_index !== current_index) {
      const temp = nums[min_index];
      nums[min_index] = nums[current_index];
      nums[current_index] = temp;
      this.minHeapify(nums, length, min_index);
    }
  }

  maxHeapify(nums: number[], length: number, current_index: number) {
    let max_index = current_index;
    const left_index = 2 * current_index + 1;
    const right_index = 2 * current_index + 2;

    if (left_index < length && nums[max_index] < nums[left_index]) {
      max_index = left_index;
    }
    if (right_index < length && nums[max_index] < nums[right_index]) {
      max_index = right_index;
    }

    if (max_index !== current_index) {
      const temp = nums[max_index];
      nums[max_index] = nums[current_index];
      nums[current_index] = temp;
      this.maxHeapify(nums, length, max_index);
    }
  }

  min_heap_push(nums: number[], val: number) {
    nums.push(val);
    for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
      this.minHeapify(nums, nums.length, i);
    }
  }

  max_heap_push(nums: number[], val: number) {
    nums.push(val);
    for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
      this.maxHeapify(nums, nums.length, i);
    }
  }

  min_heap_pop(nums: number[]): number | undefined {
    if (nums.length === 0) {
      return undefined;
    }
    const temp = nums[0];
    nums[0] = nums[nums.length - 1];
    nums[nums.length - 1] = temp;
    const top = nums.pop();
    this.minHeapify(nums, nums.length, 0);
    return top;
  }

  max_heap_pop(nums: number[]): number | undefined {
    if (nums.length === 0) {
      return undefined;
    }
    const temp = nums[0];
    nums[0] = nums[nums.length - 1];
    nums[nums.length - 1] = temp;
    const top = nums.pop();
    this.maxHeapify(nums, nums.length, 0);
    return top;
  }

  addNum(num: number): void {
    this.max_heap_push(this.small, num);

    if (this.small.length && this.large.length && this.small[0] > this.large[0]) {
      const val = this.max_heap_pop(this.small)!;
      this.min_heap_push(this.large, val);
    }

    if (this.small.length > this.large.length + 1) {
      const val = this.max_heap_pop(this.small)!;
      this.min_heap_push(this.large, val);
    }
    if (this.large.length > this.small.length + 1) {
      const val = this.min_heap_pop(this.large)!;
      this.max_heap_push(this.small, val);
    }
  }

  findMedian(): number {
    if (this.small.length > this.large.length) {
      return this.small[0];
    } else if (this.large.length > this.small.length) {
      return this.large[0];
    } else {
      return (this.small[0] + this.large[0]) / 2;
    }
  }
}

// test
const medianFinder = new MedianFinder();
medianFinder.addNum(-1);
medianFinder.addNum(-2);
medianFinder.addNum(-3);
medianFinder.addNum(-4);
medianFinder.addNum(-5);
console.log(medianFinder.findMedian());
