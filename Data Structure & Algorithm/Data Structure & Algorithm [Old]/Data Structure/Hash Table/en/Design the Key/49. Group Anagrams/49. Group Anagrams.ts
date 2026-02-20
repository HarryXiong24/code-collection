// 49. Group Anagrams

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// Example 2:
// Input: strs = [""]
// Output: [[""]]

// Example 3:
// Input: strs = ["a"]
// Output: [["a"]]

function sortStr(s: string): string {
  const arr = s.split('').sort();
  return arr.join('');
}

// in this question, we use sorted string as the key
// and let every string sort, and judge whether it in the map

// Time Complexity: O(NKlog⁡K), where N is the length of strs, and K is the maximum length of a string in strs. The outer loop has complexity O(N) as we iterate through each string. Then, we sort each string in O(Klog⁡K) time.
// Space Complexity: O(NK), the total information content stored in ans.
export function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const item of strs) {
    const sortItem = sortStr(item);
    if (map.has(sortItem)) {
      const current = map.get(sortItem)!;
      current?.push(item);
      map.set(sortItem, current);
    } else {
      map.set(sortItem, [item]);
    }
  }

  return [...map.values()];
}

// test
const res = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
console.log(res);
