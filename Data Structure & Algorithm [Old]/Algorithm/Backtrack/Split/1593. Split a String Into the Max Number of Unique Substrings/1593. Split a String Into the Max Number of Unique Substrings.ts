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
  const path = new Set<string>();

  const backtrack = (start_index: number, cur_count: number) => {
    if (start_index === s.length) {
      ans = Math.max(ans, cur_count);
      return;
    }

    for (let i = start_index; i < s.length; i++) {
      const substring = s.substring(start_index, i + 1);
      if (path.has(substring)) {
        continue;
      }
      path.add(substring);
      backtrack(i + 1, cur_count + 1);
      path.delete(substring);
    }
  };

  backtrack(0, 0);

  return ans;
}

// test
const res = maxUniqueSplit('ababccc');
console.log(res);
