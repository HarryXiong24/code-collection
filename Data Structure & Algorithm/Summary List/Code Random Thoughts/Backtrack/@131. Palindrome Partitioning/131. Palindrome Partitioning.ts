// 131. Palindrome Partitioning

// Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

// Example 1:
// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]

// Example 2:
// Input: s = "a"
// Output: [["a"]]

export function partition(s: string): string[][] {
  const results: string[][] = [];
  const path: string[] = [];

  const isPalindrome = (str: string): boolean => {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  };

  const backtrack = (start_index: number, path: string[]) => {
    if (start_index >= s.length) {
      results.push([...path]);
      return;
    }

    for (let i = start_index; i < s.length; i++) {
      if (!isPalindrome(s.slice(start_index, i + 1))) {
        continue;
      }
      path.push(s.slice(start_index, i + 1));
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

// test
const res = partition('aab');
console.log(res);
