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

// slow and fast double point
export function maxProfit1(prices: number[]): number {
  let buy_index = 0;
  let sell_index = 1;
  let max_profit = 0;

  while (sell_index < prices.length) {
    const diff = prices[sell_index] - prices[buy_index];
    if (diff <= 0) {
      buy_index = sell_index;
    } else {
      max_profit = Math.max(max_profit, diff);
    }
    sell_index++;
  }

  return max_profit;
}

// easy write
export function maxProfit2(prices: number[]): number {
  let min: number = prices[0];
  let max_profit: number = 0;

  for (let i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    max_profit = Math.max(max_profit, prices[i] - min);
  }

  return max_profit;
}

// test
const res1 = maxProfit1([7, 1, 5, 3, 6, 4]);
const res2 = maxProfit2([7, 1, 5, 3, 6, 4]);
console.log(res1);
console.log(res2);
