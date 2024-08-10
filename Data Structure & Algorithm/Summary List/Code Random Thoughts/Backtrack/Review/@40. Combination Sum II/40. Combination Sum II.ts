// 40. Combination Sum II

// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

// Example 1:
// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]

// Example 2:
// Input: candidates = [2,5,2,1,2], target = 5
// Output:
// [
// [1,2,2],
// [5]
// ]

export function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];
  candidates.sort((a, b) => a - b);

  const backtrack = (start_index: number, path: number[]) => {
    const sum = path.reduce((pre, cur) => pre + cur, 0);
    if (sum === target) {
      results.push([...path]);
      return;
    }

    if (sum > target) {
      return;
    }

    for (let i = start_index; i < candidates.length; i++) {
      if (i > start_index && candidates[i - 1] === candidates[i]) {
        continue;
      }

      path.push(candidates[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

export function combinationSum2(candidates: number[], target: number): number[][] {
  const results: number[][] = [];
  candidates.sort((a, b) => a - b);

  const backtrack = (start_index: number, path: number[]) => {
    const sum = path.reduce((pre, cur) => pre + cur, 0);
    if (sum === target) {
      results.push([...path]);
      return;
    }

    if (sum > target) {
      return;
    }

    const used = new Set();
    for (let i = start_index; i < candidates.length; i++) {
      if (used.has(candidates[i])) {
        continue;
      }
      used.add(candidates[i]);

      path.push(candidates[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

// res
const res = combinationSum([10, 1, 2, 7, 6, 1, 5], 8);
console.log(res);
const res2 = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
console.log(res2);
