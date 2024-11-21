// 309. Best Time to Buy and Sell Stock with Cooldown

// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

// After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: prices = [1,2,3,0,2]
// Output: 3
// Explanation: transactions = [buy, sell, cooldown, buy, sell]

// Example 2:
// Input: prices = [1]
// Output: 0

export function maxProfit(prices: number[]): number {
  // dp[i][0] 持有股票 i 最大金额
  // dp[i][1] 保持卖出股票状态
  // dp[i][2] 具体卖出股票的状态
  // dp[i][3] 冷冻期
  const dp: number[][] = new Array(prices.length).fill(0).map(() => new Array(4).fill(0));

  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  dp[0][2] = 0;
  dp[0][3] = 0;

  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i], dp[i - 1][3] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
    dp[i][2] = Math.max(dp[i - 1][0] + prices[i]);
    dp[i][3] = Math.max(dp[i - 1][2]);
  }

  return Math.max(dp[prices.length - 1][1], dp[prices.length - 1][2], dp[prices.length - 1][3]);
}

// test
const res = maxProfit([1, 2, 3, 0, 2]);
console.log(res);
