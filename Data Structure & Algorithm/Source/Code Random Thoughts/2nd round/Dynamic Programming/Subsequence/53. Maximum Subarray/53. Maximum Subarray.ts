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

export function maxSubArray(nums: number[]): number {
  // dp[i], 包括下标i（以nums[i]为结尾）的最大连续子序列和为dp[i]
  const dp: number[] = new Array(nums.length).fill(0);
  let maxValue = nums[0];

  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 要么为前面的最大值加上当前，要么重新开始计算
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);

    maxValue = Math.max(maxValue, dp[i]);
  }

  return maxValue;
}

// test
const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(res);
