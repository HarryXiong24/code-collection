// 209. Minimum Size Subarray Sum

// Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1

// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

export function minSubArrayLen(target: number, nums: number[]): number {
  let left: number = 0;
  let right: number = 0;

  let res: number = nums.length + 1;
  let sum: number = 0;

  while (right < nums.length) {
    sum += nums[right];
    if (sum >= target) {
      while (sum - nums[left] >= target) {
        sum -= nums[left++];
      }
      res = Math.min(res, right - left + 1);
    }
    right++;
  }
  return res === nums.length + 1 ? 0 : res;
}

// test
const res = minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
console.log(res);
