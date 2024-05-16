// 78. Subsets

// Given an integer array nums of unique elements, return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

export function subsets(nums: number[]): number[][] {
  const results: number[][] = [];
  const path: number[] = [];

  nums.sort((a, b) => a - b);

  const backTrack = (start_index: number) => {
    if (path.length > nums.length) {
      return;
    }

    results.push([...path]);

    for (let i = start_index; i < nums.length; i++) {
      path.push(nums[i]);
      backTrack(i + 1);
      path.pop();
    }
  };

  backTrack(0);

  return results;
}

// test
const res = subsets([1, 2, 3]);
console.log(res);
