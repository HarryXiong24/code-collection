// 746. Min Cost Climbing Stairs

// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

// You can either start from the step with index 0, or the step with index 1.

// Return the minimum cost to reach the top of the floor.

// Example 1:
// Input: cost = [10,15,20]
// Output: 15
// Explanation: You will start at index 1.
// - Pay 15 and climb two steps to reach the top.
// The total cost is 15.

// Example 2:
// Input: cost = [1,100,1,1,1,100,1,1,100,1]
// Output: 6
// Explanation: You will start at index 0.
// - Pay 1 and climb two steps to reach index 2.
// - Pay 1 and climb two steps to reach index 4.
// - Pay 1 and climb two steps to reach index 6.
// - Pay 1 and climb one step to reach index 7.
// - Pay 1 and climb two steps to reach index 9.
// - Pay 1 and climb one step to reach the top.
// The total cost is 6.

export function minCostClimbingStairs(cost: number[]): number {
  const dp: number[] = new Array(cost.length + 1).fill(0);

  // Start iteration from step 2, since the minimum cost of reaching
  // step 0 and step 1 is 0
  for (let i = 2; i <= cost.length; i++) {
    const take_one_step = dp[i - 1] + cost[i - 1];
    const take_two_steps = dp[i - 2] + cost[i - 2];
    dp[i] = Math.min(take_one_step, take_two_steps);
  }

  // The final element in minimum_cost refers to the top floor
  return dp[cost.length];
}

// test
const res = minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]);
console.log(res);
