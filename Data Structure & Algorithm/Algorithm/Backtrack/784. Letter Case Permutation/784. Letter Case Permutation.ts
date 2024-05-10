// 784. Letter Case Permutation

// Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.
// Return a list of all possible strings we could create. Return the output in any order.

// Example 1:
// Input: s = "a1b2"
// Output: ["a1b2","a1B2","A1b2","A1B2"]

// Example 2:
// Input: s = "3z4"
// Output: ["3z4","3Z4"]

export function letterCasePermutation(s: string): string[] {
  const results: string[] = [];
  const result: string[] = [];
  let depth: number = 0;

  const backTrack = (depth: number, result: string[]) => {
    if (depth === s.length) {
      results.push([...result].join(''));
      return;
    }
    const current = s[depth];
    if (!Number.isNaN(Number(current))) {
      result.push(current);
      backTrack(depth + 1, result);
      result.pop();
    } else {
      const map = /[a-z]/.test(current) ? [current, current.toUpperCase()] : [current, current.toLowerCase()];
      for (let i = 0; i < map.length; i++) {
        result.push(map[i]);
        backTrack(depth + 1, result);
        result.pop();
      }
    }
  };

  backTrack(depth, result);

  return results;
}

// test
const res = letterCasePermutation('a1b2');
console.log(res);
