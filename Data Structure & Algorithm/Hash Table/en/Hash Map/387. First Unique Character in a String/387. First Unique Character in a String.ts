// 387. First Unique Character in a String

// Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

// Example 1:
// Input: s = "leetcode"
// Output: 0

// Example 2:
// Input: s = "loveleetcode"
// Output: 2

// Example 3:
// Input: s = "aabb"
// Output: -1

export function firstUniqChar(s: string): number {
  const map = new Map<string, number>();

  for (let item of s) {
    if (map.has(item)) {
      const current = map.get(item)!;
      map.set(item, current + 1);
    } else {
      map.set(item, 1);
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i]) && map.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
}

// test
const res = firstUniqChar('loveleetcode');
console.log(res);
