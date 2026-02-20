// 76. Minimum Window Substring

// Given two strings s and t of lengths m and n respectively, return the minimum window
// substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

// The testcases will be generated such that the answer is unique.

// Example 1:
// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

// Example 2:
// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.

// Example 3:
// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

export function minWindow(s: string, t: string): string {
  if (s.length < t.length) {
    return '';
  }

  const count = new Map<string, number>(); // 目标字符的计数
  for (const char of t) {
    count.set(char, (count.get(char) ?? 0) + 1);
  }

  let left = 0;
  let right = 0;
  let minLen = Infinity;
  let minStart = 0;
  let matchCount = 0; // 记录满足 t 频次要求的字符个数
  const windowCount = new Map<string, number>(); // 窗口内字符的计数

  while (right < s.length) {
    const char = s[right];

    if (count.has(char)) {
      windowCount.set(char, (windowCount.get(char) ?? 0) + 1);
      if (windowCount.get(char) === count.get(char)) {
        matchCount++;
      }
    }

    while (matchCount === count.size) {
      // 窗口已经满足 t 的条件
      if (right - left + 1 < minLen) {
        // 记录最短窗口
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = s[left];
      if (count.has(leftChar)) {
        if (windowCount.get(leftChar) === count.get(leftChar)) {
          matchCount--;
        }
        windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
      }

      left++;
    }

    right++;
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}

// test
const res = minWindow('aa', 'aa');
console.log(res);
