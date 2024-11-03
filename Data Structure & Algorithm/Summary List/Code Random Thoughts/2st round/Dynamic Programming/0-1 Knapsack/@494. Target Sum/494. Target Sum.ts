// 494. Target Sum

// You are given an integer array nums and an integer target.

// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

// For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
// Return the number of different expressions that you can build, which evaluates to target.

// Example 1:
// Input: nums = [1,1,1,1,1], target = 3
// Output: 5
// Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3

// Example 2:
// Input: nums = [1], target = 1
// Output: 1

// let 1 value is the left subset, -1 value is the right subset
// left + right = sum
// left - right = target
// => left = (sum + target) / 2

// target 3, sum = 5
// left => 4
// if (sum + target) % 2 != 0, no result
export function findTargetSumWays(nums: number[], target: number): number {
  const sum: number = nums.reduce((a: number, b: number): number => a + b, 0);
  if ((sum + target) % 2 === 1 || Math.abs(target) > sum) {
    return 0;
  }
  const left: number = (sum + target) / 2;

  const dp: number[] = new Array(left + 1).fill(0);
  dp[0] = 1;

  for (let i: number = 0; i < nums.length; i++) {
    // this loop updates in reverse order, because we need to make sure each element used only once
    for (let j: number = left; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]];
    }
  }

  return dp[left];
}

// test
const res = findTargetSumWays([1, 1, 1, 1, 1], 3);
console.log(res);
