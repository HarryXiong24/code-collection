// 1593. Split a String Into the Max Number of Unique Substrings

// Given a string s, return the maximum number of unique substrings that the given string can be split into.

// You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.

// A substring is a contiguous sequence of characters within a string.

// Example 1:
// Input: s = "ababccc"
// Output: 5
// Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.

// Example 2:
// Input: s = "aba"
// Output: 2
// Explanation: One way to split maximally is ['a', 'ba'].

// Example 3:
// Input: s = "aa"
// Output: 1
// Explanation: It is impossible to split the string any further.

export function maxUniqueSplit(s: string): number {
  let ans = 0;
  const set = new Set<string>();

  const backTrack = (i: number, cnt: number, visited: Set<string>): void => {
    if (i === s.length) {
      ans = Math.max(ans, cnt);
      // stop condition
      return;
    }

    for (let j = i + 1; j <= s.length; j++) {
      const substring = s.substring(i, j);
      if (visited.has(substring)) {
        // avoid re-visit/duplicates
        continue;
      }
      visited.add(substring); // update visited set
      backTrack(j, cnt + 1, visited); // backtracking
      visited.delete(substring); // recover visited set for the next possibility
    }
  };

  backTrack(0, 0, set); // function call
  return ans;
}

// test
const res = maxUniqueSplit('aba');
console.log(res);
