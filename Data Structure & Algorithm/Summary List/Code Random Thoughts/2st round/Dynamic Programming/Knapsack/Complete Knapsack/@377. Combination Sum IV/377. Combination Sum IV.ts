// 377. Combination Sum IV

// Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.

// The test cases are generated so that the answer can fit in a 32-bit integer.

// Example 1:
// Input: nums = [1,2,3], target = 4
// Output: 7
// Explanation:
// The possible combination ways are:
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)
// Note that different sequences are counted as different combinations.

// Example 2:
// Input: nums = [9], target = 3
// Output: 0

export function combinationSum4(nums: number[], target: number): number {
  const dp: number[] = new Array(target + 1).fill(0);

  dp[0] = 1;

  // 背包
  for (let j = 0; j <= target; j++) {
    // 物品
    for (let i = 0; i < nums.length; i++) {
      if (j >= nums[i]) {
        dp[j] += dp[j - nums[i]];
      }
    }
  }

  return dp[target];
}

// test
const res = combinationSum4([3, 1, 2, 4], 4);
console.log(res);
