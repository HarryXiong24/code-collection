// 416. Partition Equal Subset Sum

// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

// Example 1:
// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].

// Example 2:
// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.

export function canPartition(nums: number[]): boolean {
  const equalSum = nums.reduce((pre, cur) => pre + cur, 0) / 2;
  if (equalSum % 1 !== 0) {
    return false;
  }
  const dp: number[][] = new Array(nums.length).fill(0).map(() => new Array(equalSum + 1).fill(0));

  // init
  for (let j = 0; j <= equalSum; j++) {
    if (nums[0] <= j) {
      dp[0][j] = nums[0];
    }
  }
  for (let i = 0; i < nums.length; i++) {
    dp[i][0] = 0;
  }

  // iterative
  for (let i = 1; i < nums.length; i++) {
    for (let j = 1; j <= equalSum; j++) {
      if (j - nums[i] < 0) {
        dp[i][j] = dp[i - i][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - nums[i]] + nums[i]);
      }
    }
  }

  return dp[nums.length - 1][equalSum] === equalSum;
}

// test
const res = canPartition([1, 5, 11, 5]);
console.log(res);
