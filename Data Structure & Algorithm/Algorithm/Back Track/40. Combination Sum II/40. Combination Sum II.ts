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

export function combinationSum2(candidates: number[], target: number): number[][] {
  const results: number[][] = [];
  const result: number[] = [];

  candidates = candidates.sort((a, b) => a - b);

  const backTrack = (currentSum: number, currentIndex: number, result: number[]) => {
    if (currentSum === target) {
      results.push([...result]);
      return;
    }

    if (currentSum > target || currentIndex >= candidates.length) {
      return;
    }

    result.push(candidates[currentIndex]);
    backTrack(currentSum + candidates[currentIndex], currentIndex + 1, result);
    result.pop();

    while (currentIndex + 1 < candidates.length && candidates[currentIndex] === candidates[currentIndex + 1]) {
      currentIndex++;
    }
    backTrack(currentSum, currentIndex + 1, result);
  };

  backTrack(0, 0, result);

  return results;
}

// test
const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
console.log(res);
