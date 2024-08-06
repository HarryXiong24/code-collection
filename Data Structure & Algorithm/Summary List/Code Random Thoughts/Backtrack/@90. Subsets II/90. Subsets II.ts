// 90. Subsets II

// Given an integer array nums that may contain duplicates, return all possible
// subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

export function subsetsWithDup(nums: number[]): number[][] {
  const results: number[][] = [];

  nums = nums.sort((a, b) => a - b);

  const backtrack = (start_index: number, path: number[]) => {
    results.push([...path]);

    if (start_index >= nums.length) {
      return;
    }

    for (let i = start_index; i < nums.length; i++) {
      if (i > start_index && nums[i - 1] === nums[i]) {
        continue;
      }
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

// test
const res = subsetsWithDup([1, 2, 2]);
console.log(res);
