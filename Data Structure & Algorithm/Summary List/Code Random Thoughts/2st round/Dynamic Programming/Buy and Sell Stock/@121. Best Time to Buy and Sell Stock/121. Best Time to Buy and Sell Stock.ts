// 121. Best Time to Buy and Sell Stock

// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

// Example 2:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

export function maxProfit(prices: number[]): number {
  // dp[i][0] 持有股票 i 最大金额, dp[i][1] 不持有股票 i 最大金额
  const dp: number[][] = new Array(prices.length).fill(0).map(() => new Array(2).fill(0));

  dp[0][0] = -prices[0];
  dp[0][1] = 0;

  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i]); // 因为只能买一次，所以是 -prices[0]
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]); // 后面是卖了的情况
  }

  return dp[prices.length - 1][1];
}

// Greedy
function maxProfit_Greedy(prices: number[]): number {
  let maxProfit = 0;
  let low = Infinity;

  for (let i = 0; i < prices.length; i++) {
    low = Math.min(low, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - low);
  }

  return maxProfit;
}

// monotonicStack
function maxProfit_MonotonicStack(prices: number[]): number {
  const monotonicStack: number[] = [];
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[monotonicStack[monotonicStack.length - 1]] > prices[i]) {
      maxProfit = Math.max(maxProfit, prices[monotonicStack[monotonicStack.length - 1]] - prices[monotonicStack[0]]);
      while (monotonicStack.length > 0 && prices[monotonicStack[monotonicStack.length - 1]] > prices[i]) {
        monotonicStack.pop()!;
      }
    }

    monotonicStack.push(i);
  }

  // at last, we still need to do it once. case: [1, 2]
  maxProfit = Math.max(maxProfit, prices[monotonicStack[monotonicStack.length - 1]] - prices[monotonicStack[0]]);

  return maxProfit;
}

// test
const res = maxProfit([7, 1, 5, 3, 6, 4]);
console.log(res);
const res1 = maxProfit_MonotonicStack([7, 1, 5, 3, 6, 4]);
console.log(res1);
