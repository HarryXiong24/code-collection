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

// recursion
export function findTargetSumWays(nums: number[], target: number): number {
  const recursion = (n: number, target: number, sum: number): number => {
    if (n === nums.length) {
      if (sum === target) {
        return 1;
      } else {
        return 0;
      }
    }

    return recursion(n + 1, target, sum - nums[n]) + recursion(n + 1, target, sum + nums[n]);
  };

  return recursion(0, target, 0);
}

// memoization
export function findTargetSumWays_memoization(nums: number[], target: number): number {
  const total = nums.reduce((prev, cur) => prev + cur);
  const dp: number[][] = [...new Array(nums.length)].map(() => new Array(2 * total + 1).fill(-1));

  const recursion = (n: number, target: number, sum: number): number => {
    if (n === nums.length) {
      if (sum === target) {
        return 1;
      } else {
        return 0;
      }
    }

    if (dp[n][total + sum] !== -1) {
      return dp[n][total + sum];
    }

    dp[n][total + sum] = recursion(n + 1, target, sum - nums[n]) + recursion(n + 1, target, sum + nums[n]);

    return dp[n][total + sum];
  };

  return recursion(0, target, 0);
}

// bottom-up
export function findTargetSumWays_bottom_up(nums: number[], target: number): number {
  const total = nums.reduce((prev, cur) => prev + cur);
  const dp: number[][] = [...new Array(nums.length)].map(() => new Array(2 * total + 1).fill(0));

  if (total < Math.abs(target)) {
    return 0;
  }

  dp[0][total - nums[0]] += 1;
  dp[0][total + nums[0]] = 1;

  for (let i = 1; i < dp.length; i++) {
    for (let j = -total; j <= total; j++) {
      if (dp[i - 1][total + j] > 0) {
        dp[i][j + total + nums[i]] += dp[i - 1][j + total];
        dp[i][j + total - nums[i]] += dp[i - 1][j + total];
      }
    }
  }

  return dp[nums.length - 1][target + total];
}

// test
const res = findTargetSumWays([1, 1, 1, 1, 1], 3);
console.log(res);

const res1 = findTargetSumWays_memoization([1, 1, 1, 1, 1], 3);
console.log(res1);

const res2 = findTargetSumWays_bottom_up([1, 1, 1, 1, 1], 3);
console.log(res2);
