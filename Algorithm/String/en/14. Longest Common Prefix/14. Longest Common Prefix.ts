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

// Time complexity O(mn), m is the average length of the string in string array, n is the length of array.
// Space complexity : O(1)
export function longestCommonPrefix(strs: string[]): string {
  // firstly, the shortest string need to be find
  let short = strs[0];
  for (let val of strs) {
    if (val.length < short.length) {
      short = val;
    }
  }

  // define variable count, which uses to record the final matching result length
  let count = short.length;
  for (let i = 0; i < strs.length; i++) {
    // define variable count, which uses to record the current matching length
    let temp_count = 0;
    for (let j = 0; j < short.length; j++) {
      if (strs[i][j] !== short[j]) {
        break;
      }
      temp_count++;
    }
    // if temp_count < count, count should be the less one
    if (temp_count < count) {
      count = temp_count;
    }
  }

  return short.substring(0, count);
}

// test
const str = ['flower'];
const res = longestCommonPrefix(str);
console.log(res);
