// 115. Distinct Subsequences

// Given two strings s and t, return the number of distinct subsequences of s which equals t.

// The test cases are generated so that the answer fits on a 32-bit signed integer.

// Example 1:
// Input: s = "rabbbit", t = "rabbit"
// Output: 3
// Explanation:
// As shown below, there are 3 ways you can generate "rabbit" from s.
// rabbbit
// rabbbit
// rabbbit

// Example 2:
// Input: s = "babgbag", t = "bag"
// Output: 5
// Explanation:
// As shown below, there are 5 ways you can generate "bag" from s.
// babgbag
// babgbag
// babgbag
// babgbag
// babgbag

export function numDistinct(s: string, t: string): number {
  // dp[i][j] show the s[0:i] is a subsequence of t[0:j]
  const dp: number[][] = new Array(s.length + 1).fill(false).map(() => new Array(t.length + 1).fill(0));

  // init
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[s.length][t.length];
}

// test
const res = numDistinct('rabbbit', 'rabbit');
console.log(res);
