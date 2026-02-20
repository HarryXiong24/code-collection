// 28. Find the Index of the First Occurrence in a String

// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

// Example 1:
// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.

// Example 2:
// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.

// sliding window or two point concept
export function strStr(haystack: string, needle: string): number {
  const res = -1;
  let slow = 0;
  let fast = 0;

  for (let i = 0; i < haystack.length; i++) {
    slow = i;
    fast = slow;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[fast] !== needle[j]) {
        break;
      }
      fast++;
    }
    if (fast - slow === needle.length) {
      return slow;
    } else {
      slow++;
    }
  }

  return res;
}

// test
const res = strStr('leetcode', 'et');
console.log(res);
