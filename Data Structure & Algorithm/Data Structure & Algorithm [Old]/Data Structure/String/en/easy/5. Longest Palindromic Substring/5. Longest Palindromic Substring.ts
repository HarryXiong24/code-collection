// 5. Longest Palindromic Substring

// Given a string s, return the longest palindromic substring in s.

// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// Example 2:
// Input: s = "cbbd"
// Output: "bb"

export function longestPalindrome(s: string): string {
  let maxLen: number = 0;
  let res: string = '';

  const isPalindromic = (s: string, left: number, right: number): boolean => {
    if (left >= right) {
      return true;
    }

    if (s.charAt(left) !== s.charAt(right)) {
      return false;
    }

    if (right - left <= 2) {
      return true;
    }

    return isPalindromic(s, left + 1, right - 1);
  };

  for (let left: number = 0; left < s.length; left++) {
    for (let right: number = left; right < s.length; right++) {
      if (s.charAt(left) === s.charAt(right) && isPalindromic(s, left + 1, right - 1)) {
        if (maxLen < right - left + 1) {
          maxLen = right - left + 1;
          res = s.substring(left, right + 1);
        }
      }
    }
  }

  return res;
}

// test
const res = longestPalindrome('babad');
console.log(res);
