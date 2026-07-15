// 3. Longest Substring Without Repeating Characters

// Given a string s, find the length of the longest
// substring without repeating characters.

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
  const map = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    let current = i;
    const set = new Set();
    while (current < s.length) {
      if (set.has(s[current]) === false) {
        set.add(s[current]);
        current++;
      } else {
        break;
      }
    }
    if (map.has(s[i]) && map.get(s[i])! < set.size) {
      map.set(s[i], set.size);
    }
    if (!map.has(s[i])) {
      map.set(s[i], set.size);
    }
  }

  const res = [...map.values()].sort((a, b) => a - b);

  return res[res.length - 1] || 0;
}

// test
const res = lengthOfLongestSubstring('nigzhtkqxr');
console.log(res);
