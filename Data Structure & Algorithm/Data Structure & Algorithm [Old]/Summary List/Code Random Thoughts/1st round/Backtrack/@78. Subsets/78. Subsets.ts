// 78. Subsets

// Given an integer array nums of unique elements, return all possible
// subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

export function subsets(nums: number[]): number[][] {
  const results: number[][] = [];

  const backtrack = (start_index: number, path: number[]) => {
    results.push([...path]);

    if (start_index >= nums.length) {
      return;
    }

    for (let i = start_index; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);

  return results;
}

// test
const res = subsets([1, 2, 3]);
console.log(res);
