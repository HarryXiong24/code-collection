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

function combinationSum2(candidates: number[], target: number): number[][] {
  const results: number[][] = [];
  const visited: boolean[] = new Array(candidates.length).fill(false);
  const result: number[] = [];
  const isRepeat = new Set<string>();

  candidates = candidates.sort((a, b) => a - b);

  const backTrack = (currentSum: number, currentIndex: number, visited: boolean[], result: number[]) => {
    if (currentSum > target || currentIndex > candidates.length) {
      return;
    }
    if (currentSum === target) {
      const temp = [...result];
      if (!isRepeat.has(JSON.stringify(temp))) {
        isRepeat.add(JSON.stringify(temp));
        results.push([...result]);
      }
      return;
    }

    result.push(candidates[currentIndex]);
    backTrack(currentSum + candidates[currentIndex], currentIndex + 1, visited, result);
    result.pop();

    while (currentIndex + 1 < candidates.length && candidates[currentIndex] === candidates[currentIndex + 1]) {
      currentIndex++;
    }
    backTrack(currentSum, currentIndex + 1, visited, result);
  };

  backTrack(0, 0, visited, result);

  return results;
}

// test
const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
console.log(res);
