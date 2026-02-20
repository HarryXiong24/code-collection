// 1049. Last Stone Weight II

// You are given an array of integers stones where stones[i] is the weight of the ith stone.

// We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y. The result of this smash is:

// If x == y, both stones are destroyed, and
// If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
// At the end of the game, there is at most one stone left.

// Return the smallest possible weight of the left stone. If there are no stones left, return 0.

// Example 1:
// Input: stones = [2,7,4,1,8,1]
// Output: 1
// Explanation:
// We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
// we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
// we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
// we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.

// Example 2:
// Input: stones = [31,26,33,21,40]
// Output: 5

export function lastStoneWeightII(stones: number[]): number {
  const maxWeight = stones.reduce((prev, cur) => prev + cur, 0);
  const target = Math.floor(maxWeight / 2);
  const dp: number[][] = new Array(stones.length).fill(0).map(() => new Array(target).fill(0));

  if (stones.length === 1) {
    return stones[0];
  }

  // init
  for (let j = 0; j <= target; j++) {
    if (stones[0] <= j) {
      dp[0][j] = stones[0];
    }
  }
  for (let i = 0; i < stones.length; i++) {
    dp[i][0] = 0;
  }

  for (let i = 1; i < stones.length; i++) {
    for (let j = 1; j <= target; j++) {
      if (j - stones[i] >= 0) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - stones[i]] + stones[i]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return maxWeight - 2 * dp[stones.length - 1][target];
}

// test
const res = lastStoneWeightII([2, 7, 4, 1, 8, 1]);
console.log(res);
