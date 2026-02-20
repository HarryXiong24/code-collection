// 242. Valid Anagram

// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true

// Example 2:
// Input: s = "rat", t = "car"
// Output: false

export function isAnagram(s: string, t: string): boolean {
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
}

// test
const res = isAnagram('anagram', 'nagaram');
console.log(res);
