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

// Divide and conquer technique
// Time complexity O(mn), m is the average length of the string in string array, n is the length of array.
// Space complexity: O(mlogn)
export function longestCommonPrefix1(strs: string[]): string {
  const lcp = (start: number, end: number): string => {
    if (start === end) {
      return strs[start];
    }

    const mid = Math.floor((start + end) / 2);
    const [left, right] = [lcp(0, mid), lcp(mid + 1, end)];
    const minLength = Math.min(left.length, right.length);
    for (let i = 0; i < minLength; i++) {
      if (left[i] !== right[i]) {
        return left.substring(0, i);
      }
    }

    return left.substring(0, minLength);
  };

  return lcp(0, strs.length - 1);
}

// Binary search technique
// Time complexity O(mnlogm), m is the average length of the string in string array, n is the length of array.
// Space complexity: O(1)
export function longestCommonPrefix2(strs: string[]): string {
  // firstly, the shortest string need to be find
  let short = strs[0];
  for (let val of strs) {
    if (val.length < short.length) {
      short = val;
    }
  }

  // Compare the results of each binary search with all elements in the string array
  const isCommonPrefix = (mid: number) => {
    const temp = short.substring(0, mid);
    for (let val of strs) {
      if (val.indexOf(temp) !== 0) {
        return false;
      }
    }
    return true;
  };

  let [left, right] = [0, short.length];
  while (left < right) {
    const mid = Math.floor((right - left + 1) / 2) + left;
    if (isCommonPrefix(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return short.substring(0, left);
}

// test
const str = ['flower', 'fl'];
const res = longestCommonPrefix(str);
const res1 = longestCommonPrefix1(str);
const res2 = longestCommonPrefix2(str);
console.log(res);
console.log(res1);
console.log(res2);
