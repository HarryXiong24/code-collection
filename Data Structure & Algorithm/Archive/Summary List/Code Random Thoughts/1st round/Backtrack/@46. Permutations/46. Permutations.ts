// 46. Permutations

// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// Example 2:
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]

// Example 3:
// Input: nums = [1]
// Output: [[1]]

export function permute(nums: number[]): number[][] {
  const results: number[][] = [];
  const used = new Set();

  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      results.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used.has(nums[i])) {
        continue;
      }

      path.push(nums[i]);
      used.add(nums[i]);
      backtrack(path);
      used.delete(nums[i]);
      path.pop();
    }
  };

  backtrack([]);

  return results;
}

// test
const res = permute([1, 2, 3]);
console.log(res);
