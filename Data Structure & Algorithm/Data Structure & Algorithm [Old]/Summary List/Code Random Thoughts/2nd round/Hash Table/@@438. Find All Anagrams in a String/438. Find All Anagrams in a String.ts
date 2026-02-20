// 438. Find All Anagrams in a String

// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

// Example 1:
// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

// Example 2:
// Input: s = "abab", p = "ab"
// Output: [0,1,2]
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".

export function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];

  if (p.length > s.length) {
    return result;
  }

  // Create frequency arrays for p and for the sliding window in s
  const pCount = new Array(26).fill(0); // To store the frequency of characters in p
  const sCount = new Array(26).fill(0); // To store the frequency of characters in the current window of s

  // Helper function to convert a character to an index (0-25) for 'a' to 'z'
  const charCode = (char: string) => char.charCodeAt(0) - 'a'.charCodeAt(0);

  // Build the frequency map for p
  for (let i = 0; i < p.length; i++) {
    pCount[charCode(p[i])] += 1;
  }

  // Now iterate through the string s and maintain the sliding window
  for (let i = 0; i < s.length; i++) {
    // Add the current character to the current window count
    sCount[charCode(s[i])] += 1;

    // Remove the character that is left out of the window
    if (i >= p.length) {
      sCount[charCode(s[i - p.length])] -= 1;
    }

    // Compare the two frequency arrays
    if (pCount.toString() === sCount.toString()) {
      result.push(i - p.length + 1);
    }
  }

  return result;
}

// Time Limit
export function findAnagrams1(s: string, p: string): number[] {
  const result: number[] = [];
  const length = p.length;

  const isAnagram = (s: string, t: string): boolean => {
    const map = new Map<string, number>();

    for (const item of s) {
      if (map.has(item)) {
        const current = map.get(item)!;
        map.set(item, current + 1);
      } else {
        map.set(item, 1);
      }
    }

    for (const item of t) {
      if (map.has(item)) {
        const current = map.get(item)!;
        map.set(item, current - 1);
      } else {
        return false;
      }
    }

    for (const value of map.values()) {
      if (value !== 0) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < s.length; i++) {
    if (i + length <= s.length) {
      const current = s.slice(i, i + length);
      if (isAnagram(current, p)) {
        result.push(i);
      }
    }
  }

  return result;
}

// test
const res = findAnagrams('cbaebabacd', 'abc');
console.log(res);
