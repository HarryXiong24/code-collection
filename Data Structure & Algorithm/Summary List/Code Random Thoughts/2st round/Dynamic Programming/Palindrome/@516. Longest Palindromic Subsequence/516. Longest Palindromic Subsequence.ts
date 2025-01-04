// 516. Longest Palindromic Subsequence

// Given a string s, find the longest palindromic subsequence's length in s.

// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

// Example 1:
// Input: s = "bbbab"
// Output: 4
// Explanation: One possible longest palindromic subsequence is "bbbb".

// Example 2:
// Input: s = "cbbd"
// Output: 2
// Explanation: One possible longest palindromic subsequence is "bb".

export function longestPalindromeSubseq(s: string): number {
  // dp[i][j]：[i,j]区间内，最长回文子序列的长度
  const length: number = s.length;
  const dp: number[][] = new Array(length).fill(0).map((_) => new Array(length).fill(0));
  for (let i = 0; i < length; i++) {
    dp[i][i] = 1;
  }

  // 自下而上，自左往右遍历
  for (let i = length - 1; i >= 0; i--) {
    for (let j = i + 1; j < length; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }
  return dp[0][length - 1];
}

// test
const res = longestPalindromeSubseq('bbbab');
console.log(res);
