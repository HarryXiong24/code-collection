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
  const path: number[] = [];

  nums = nums.sort((a, b) => a - b);

  const backTrack = (start_index: number) => {
    results.push([...path]);

    for (let i = start_index; i < nums.length; i++) {
      if (i > start_index && nums[i] === nums[i - 1]) {
        continue;
      }
      path.push(nums[i]);
      backTrack(i + 1);
      path.pop();
    }
  };

  backTrack(0);

  return results;
}

// test
const res = subsetsWithDup([1, 2, 2]);
console.log(res);
