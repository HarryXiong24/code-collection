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
  const result: number[] = [];

  nums = nums.sort((a, b) => a - b);

  const backTrack = (currentIndex: number, result: number[]) => {
    results.push([...result]);
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
const res = subsets([1, 2, 3]);
console.log(res);
