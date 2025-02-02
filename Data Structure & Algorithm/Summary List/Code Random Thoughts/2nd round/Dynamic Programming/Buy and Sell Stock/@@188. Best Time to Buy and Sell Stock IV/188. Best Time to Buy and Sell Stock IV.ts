// 188. Best Time to Buy and Sell Stock IV

// You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

// Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: k = 2, prices = [2,4,1]
// Output: 2
// Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.

// Example 2:
// Input: k = 2, prices = [3,2,6,5,0,3]
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

export function maxProfit(k: number, prices: number[]): number {
  const dp: number[][] = new Array(prices.length).fill(0).map(() => new Array(k * 2 + 1).fill(0));

  // init
  for (let i = 0; i <= k * 2; i++) {
    if (i % 2 === 0) {
      dp[0][i] = 0;
    } else {
      dp[0][i] = -prices[0];
    }
  }

  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = dp[i - 1][0];
    for (let j = 1; j <= k * 2; j++) {
      if (j % 2 === 1) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i]);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + prices[i]);
      }
    }
  }

  return dp[prices.length - 1][2 * k];
}

// test
const res = maxProfit(2, [2, 4, 1]);
console.log(res);
