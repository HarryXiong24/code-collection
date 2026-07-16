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

export function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) {
    return -1;
  }

  const findLSP = (needle: string): number[] => {
    const lsp: number[] = new Array(needle.length).fill(0);
    let j = 0;
    lsp[0] = 0;

    for (let i = 1; i < needle.length; i++) {
      while (j > 0 && needle[i] !== needle[j]) {
        j = lsp[j - 1];
      }
      if (needle[i] === needle[j]) {
        j++;
      }
      lsp[i] = j;
    }

    return lsp;
  };

  const lsp = findLSP(needle);
  let j = 0;

  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = lsp[j - 1];
    }
    if (haystack[i] === needle[j]) {
      if (j === needle.length - 1) {
        return i - j;
      }
      j++;
    }
  }
  return -1;
}

// test
const res = strStr('sadbutsad', 'sad');
console.log(res);
