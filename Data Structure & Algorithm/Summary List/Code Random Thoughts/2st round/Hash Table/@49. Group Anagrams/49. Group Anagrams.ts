// 49. Group Anagrams

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Explanation:
// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

// Example 2:
// Input: strs = [""]
// Output: [[""]]

// Example 3:
// Input: strs = ["a"]
// Output: [["a"]]

export function groupAnagrams(strs: string[]): string[][] {
  const sortedStrs = strs.map((item) => item.split('').sort().join(''));
  const map = new Map();

  for (const item of sortedStrs) {
    if (!map.has(item)) {
      map.set(item, []);
    }
  }

  for (const item of strs) {
    const sorted = item.split('').sort().join('');
    if (map.has(sorted)) {
      map.get(sorted).push(item);
    }
  }

  return [...map.values()];
}

// test
const res = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
console.log(res);
