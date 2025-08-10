// 279. Perfect Squares

// Given an integer n, return the least number of perfect square numbers that sum to n.

// A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

// Example 1:
// Input: n = 12
// Output: 3
// Explanation: 12 = 4 + 4 + 4.

// Example 2:
// Input: n = 13
// Output: 2
// Explanation: 13 = 4 + 9.

export function numSquares(n: number): number {
  const dp: number[] = new Array(n + 1).fill(Infinity);
  const item: number[] = [];

  for (let i = 1; i <= Math.ceil(n / 2); i++) {
    if (i * i <= n) {
      item.push(i * i);
    }
  }

  dp[0] = 0;

  for (let i = 0; i <= item.length; i++) {
    for (let j = item[i]; j <= n; j++) {
      dp[j] = Math.min(dp[j], dp[j - item[i]] + 1);
    }
  }

  return dp[n] === Infinity ? -1 : dp[n];
}

// test
const res = numSquares(1);
console.log(res);
