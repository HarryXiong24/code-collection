// 239. Sliding Window Maximum

// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

// Return the max sliding window.

// Example 1:
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation:
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

// Example 2:
// Input: nums = [1], k = 1
// Output: [1]

class MonotonicQueue {
  queue: number[];

  constructor() {
    this.queue = [];
  }

  push(value: number) {
    while (this.queue.length && this.queue[this.queue.length - 1] < value) {
      this.queue.pop()!;
    }
    this.queue.push(value);
  }

  pop(value: number) {
    if (this.queue.length && this.queue[0] === value) {
      return this.queue.shift()!;
    }
    return null;
  }

  top() {
    if (this.queue.length) {
      return this.queue[0];
    }
    return null;
  }
}

export function maxSlidingWindow(nums: number[], k: number): number[] {
  const monotonicQueue = new MonotonicQueue();
  const result: number[] = [];

  for (let i = 0; i < k; i++) {
    monotonicQueue.push(nums[i]);
  }

  result.push(monotonicQueue.top()!);

  for (let i = k; i < nums.length; i++) {
    monotonicQueue.pop(nums[i - k])!;
    monotonicQueue.push(nums[i]);
    result.push(monotonicQueue.top()!);
  }

  return result;
}

// test
// const res = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
// console.log(res);

// const res1 = maxSlidingWindow([1, -1], 1);
// console.log(res1);

const res2 = maxSlidingWindow([1, 3, 1, 2, 0, 5], 3);
console.log(res2);
