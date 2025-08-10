// 77. Combinations

// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

// You may return the answer in any order.

// Example 1:
// Input: n = 4, k = 2
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
// Explanation: There are 4 choose 2 = 6 total combinations.
// Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.

// Example 2:
// Input: n = 1, k = 1
// Output: [[1]]
// Explanation: There is 1 choose 1 = 1 total combination.

export function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  const backtrack = (start_index: number) => {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start_index; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  };

  backtrack(1);

  return result;
}

export function combine_pruning(n: number, k: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  const backtrack = (start_index: number) => {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start_index; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  };

  backtrack(1);

  return result;
}

// test
const res = combine(4, 2);
const res1 = combine_pruning(4, 2);
console.log(res);
console.log(res1);
