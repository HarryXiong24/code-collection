// 205. Isomorphic Strings

// Given two strings s and t, determine if they are isomorphic.

// Two strings s and t are isomorphic if the characters in s can be replaced to get t.

// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

// Example 1:
// Input: s = "egg", t = "add"
// Output: true

// Example 2:
// Input: s = "foo", t = "bar"
// Output: false

// Example 3:
// Input: s = "paper", t = "title"
// Output: true

export function isIsomorphic(s: string, t: string): boolean {
  const map1 = new Map<string, string>();
  const map2 = new Map<string, string>();

  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    if (!map1.has(s[i]) && !map2.has(t[i])) {
      map1.set(s[i], t[i]);
      map2.set(t[i], s[i]);
    } else {
      if (t[i] !== map1.get(s[i]) || s[i] !== map2.get(t[i])) {
        return false;
      }
    }
  }

  return true;
}

// test
const res = isIsomorphic('egg', 'add');
console.log(res);
