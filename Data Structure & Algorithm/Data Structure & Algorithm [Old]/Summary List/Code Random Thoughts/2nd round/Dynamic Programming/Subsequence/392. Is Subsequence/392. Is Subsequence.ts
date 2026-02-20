// 392. Is Subsequence

// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

// Example 1:
// Input: s = "abc", t = "ahbgdc"
// Output: true

// Example 2:
// Input: s = "axc", t = "ahbgdc"
// Output: false

export function isSubsequence(s: string, t: string): boolean {
  if (s.length > t.length) {
    return false;
  }

  // dp[i][j] show the s[0:i] is a subsequence of t[0:j]
  const dp: boolean[][] = new Array(s.length + 1).fill(false).map(() => new Array(t.length + 1).fill(false));

  // init
  for (let j = 0; j <= t.length; j++) {
    dp[0][j] = true;
  }
  for (let i = 1; i <= s.length; i++) {
    dp[i][0] = false;
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[s.length][t.length];
}

// test
const res = isSubsequence('abc', 'ahbgdc');
const res1 = isSubsequence('axc', 'ahbgdc');
console.log(res);
console.log(res1);
