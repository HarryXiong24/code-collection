// 3. Longest Substring Without Repeating Characters

// Given a string s, find the length of the longest substring without repeating characters.

// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

export function lengthOfLongestSubstring(s: string): number {
  let fast = 0;
  let res = 0;
  const arr: string[] = [];

  while (fast < s.length) {
    if (arr.includes(s[fast])) {
      const index = arr.indexOf(s[fast]);
      arr.splice(0, index + 1);
      console.log(arr);
    }
    arr.push(s[fast]);
    res = Math.max(res, arr.length);
    fast++;
  }

  return res;
}

// test
const res = lengthOfLongestSubstring('abcabcbb');
console.log(res);
