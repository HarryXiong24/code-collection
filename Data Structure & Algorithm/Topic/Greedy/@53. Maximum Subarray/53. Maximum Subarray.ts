// 53. Maximum Subarray

// Given an integer array nums, find the subarray with the largest sum, and return its sum.

// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

// Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.

// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// The key idea of the greedy approach is that when the current sum becomes negative, we should abandon it and restart the sum from the next element.
export function maxSubArray(nums: number[]): number {
  let sum = -Infinity;
  let current = 0;
  let index = 0;

  while (index < nums.length) {
    if (current < 0) {
      current = 0;
    }
    current += nums[index];
    sum = Math.max(sum, current);
    index++;
  }

  return sum;
}

// test
const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(res);
