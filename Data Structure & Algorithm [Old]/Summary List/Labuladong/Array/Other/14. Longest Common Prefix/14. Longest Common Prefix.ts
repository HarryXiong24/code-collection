// 14. Longest Common Prefix

// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

function isPrefix(str1: string, str2: string): string {
  let index = 0;

  for (let i = 0; i < str1.length && i < str2.length; i++) {
    if (str1[index] !== str2[index]) {
      break;
    }
    index++;
  }

  return str1.substring(0, index);
}

export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) {
    return '';
  }

  if (strs.length === 1) {
    return strs[0];
  }

  let res = strs[0];

  for (let i = 1; i < strs.length; i++) {
    res = isPrefix(res, strs[i]);
  }

  return res;
}

// res
const res = longestCommonPrefix(['flower', 'flow', 'flight']);
console.log(res);
