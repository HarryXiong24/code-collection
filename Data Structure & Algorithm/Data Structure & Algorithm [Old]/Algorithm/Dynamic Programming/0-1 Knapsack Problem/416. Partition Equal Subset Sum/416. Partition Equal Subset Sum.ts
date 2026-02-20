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

// recursive
export function canPartition(nums: number[]): boolean {
  const recursion = (nums: number[], n: number, sub_sum: number): boolean => {
    if (sub_sum === 0 && n >= 0) {
      return true;
    }

    if (n < 0) {
      return false;
    }

    if (nums[n] > sub_sum) {
      return recursion(nums, n - 1, sub_sum);
    }

    return recursion(nums, n - 1, sub_sum - nums[n]) || recursion(nums, n - 1, sub_sum);
  };

  const total = nums.reduce((prev, cur) => prev + cur);

  if (total % 2 !== 0) {
    return false;
  }

  return recursion(nums, nums.length - 1, total / 2);
}

// memoization
export function canPartition_memoization(nums: number[]): boolean {
  const total = nums.reduce((prev, cur) => prev + cur);

  if (total % 2 !== 0) {
    return false;
  }

  const dp: (boolean | null)[][] = [...Array(nums.length + 1)].map(() =>
    new Array(Math.floor(total / 2) + 1).fill(null)
  );

  const recursion = (nums: number[], n: number, sub_sum: number): boolean => {
    if (sub_sum === 0 && n >= 0) {
      return true;
    }

    if (n < 0) {
      return false;
    }

    if (dp[n][sub_sum] !== null) {
      return dp[n][sub_sum] as boolean;
    }

    if (nums[n] > sub_sum) {
      dp[n][sub_sum] = recursion(nums, n - 1, sub_sum);
      return dp[n][sub_sum] as boolean;
    }

    dp[n][sub_sum] = recursion(nums, n - 1, sub_sum - nums[n]) || recursion(nums, n - 1, sub_sum);
    return dp[n][sub_sum] as boolean;
  };

  return recursion(nums, nums.length - 1, total / 2);
}

// bottom-up
export function canPartition_bottom_up(nums: number[]): boolean {
  const total = nums.reduce((prev, cur) => prev + cur);

  if (total % 2 !== 0) {
    return false;
  }

  const dp: number[][] = [...Array(nums.length)].map(() => new Array(Math.floor(total / 2) + 1).fill(0));

  // init
  for (let i = nums[0]; i <= total / 2; i++) {
    dp[0][i] = nums[0];
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      if (j < nums[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - nums[i]] + nums[i]);
      }
    }
  }

  return dp[nums.length - 1][Math.floor(total / 2)] === Math.floor(total / 2);
}

const res = canPartition([1, 5, 11, 5]);
console.log(res);

const res1 = canPartition_memoization([1, 5, 11, 5]);
console.log(res1);

const res2 = canPartition_bottom_up([3, 3, 3, 4, 5]);
console.log(res2);
