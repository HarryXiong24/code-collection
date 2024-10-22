// 343. Integer Break

// Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.

// Return the maximum product you can get.

// Example 1:
// Input: n = 2
// Output: 1
// Explanation: 2 = 1 + 1, 1 × 1 = 1.

// Example 2:
// Input: n = 10
// Output: 36
// Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.

export function integerBreak(n: number): number {
  const dp: number[] = new Array(n + 1).fill(0);

  dp[0] = 0;
  dp[1] = 0;
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      // dp[i - j] 表示的是 i - j 通过任意方式拆分（可以是继续拆分，也可以是只拆分为两个数）的最大乘积。
      // j * (i - j)：有时候直接不拆分 i - j 可能会产生更大的乘积。例如，当 i - j 是一个很大的数时，直接相乘可能会是最优解。
      // j * dp[i - j]：而在另一些情况下，拆分 i - j 后，继续分割它能得到更大的乘积。
      dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i]);
    }
  }

  return dp[n];
}

// test
const res = integerBreak(10);
console.log(res);
