// 189. Rotate Array

// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]

// Example 2:
// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
// Explanation:
// rotate 1 steps to the right: [99,-1,-100,3]
// rotate 2 steps to the right: [3,99,-1,-100]

/**
 Do not return anything, modify nums in-place instead.
 */
// T: O(n^2)
// S: O(1)
export function rotate(nums: number[], k: number): void {
  while (k > 0) {
    const temp = nums[nums.length - 1];
    for (let i = nums.length - 1; i >= 0; i--) {
      nums[i] = nums[i - 1];
    }
    nums[0] = temp;
    k--;
  }
}

// T: O(n)
// S: O(1)
export function rotate_better(nums: number[], k: number): void {
  const reverseSegment = (start: number, end: number) => {
    let left = start;
    let right = end;
    while (left < right) {
      const temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      left++;
      right--;
    }
  };

  // case: [-1], k = 2
  k = k % nums.length;

  reverseSegment(0, nums.length - 1);
  reverseSegment(0, k - 1);
  reverseSegment(k, nums.length - 1);
}

export function rotate_better1(nums: number[], k: number): void {
  k = k % nums.length;
  let start = 0;
  let count = 0;

  while (count < nums.length) {
    let current = start;
    let prev = nums[start];
    while (true) {
      const next_idx = (current + k) % nums.length;
      const temp = nums[next_idx];
      nums[next_idx] = prev;
      prev = temp;
      current = next_idx;
      count++;

      if (start === current) {
        break;
      }
      start++;
    }
  }
}

// test
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;
rotate(nums, k);
const nums2 = [1, 2, 3, 4, 5, 6, 7];
rotate_better(nums2, k);
const nums3 = [1, 2, 3, 4, 5, 6, 7];
rotate_better1(nums3, k);
console.log(nums);
console.log(nums2);
console.log(nums3);
