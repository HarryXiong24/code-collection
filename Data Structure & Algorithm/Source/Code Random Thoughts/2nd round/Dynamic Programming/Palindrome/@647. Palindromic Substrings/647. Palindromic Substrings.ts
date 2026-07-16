// 647. Palindromic Substrings

// Given a string s, return the number of palindromic substrings in it.

// A string is a palindrome when it reads the same backward as forward.

// A substring is a contiguous sequence of characters within the string.

// Example 1:
// Input: s = "abc"
// Output: 3
// Explanation: Three palindromic strings: "a", "b", "c".

// Example 2:
// Input: s = "aaa"
// Output: 6
// Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

export function countSubstrings(s: string): number {
  const dp: boolean[][] = new Array(s.length).fill(false).map(() => new Array(s.length).fill(false));

  // init
  let resCount: number = 0;

  // 自下而上，自左向右遍历
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1] === true)) {
        dp[i][j] = true;
        resCount++;
      }
    }
  }

  return resCount;
}

// test
const res = countSubstrings('aaa');
console.log(res);
