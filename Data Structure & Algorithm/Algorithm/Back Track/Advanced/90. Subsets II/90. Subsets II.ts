// 90. Subsets II

// Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

export function subsetsWithDup(nums: number[]): number[][] {
  const results: number[][] = [];
  const result: number[] = [];
  const used = new Set<string>();

  nums = nums.sort((a, b) => a - b);

  const backTrack = (currentIndex: number, result: number[]) => {
    const record = [...result];
    if (!used.has(JSON.stringify(record))) {
      used.add(JSON.stringify(record));
      results.push(record);
    }
    for (let i = currentIndex; i < nums.length; i++) {
      result.push(nums[i]);
      backTrack(i + 1, result);
      result.pop();
    }
  };

  backTrack(0, result);

  return results;
}

// test
const res = subsetsWithDup([1, 2, 2]);
console.log(res);
