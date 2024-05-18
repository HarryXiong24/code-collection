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
  const path: number[] = [];
  const used: boolean[] = [];

  const backTrack = (used: boolean[]) => {
    if (path.length === nums.length) {
      results.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i] === true) {
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      backTrack(used);
      path.pop();
      used[i] = false;
    }
  };

  backTrack(used);

  return results;
}

// test
const res = permute([1, 2, 3]);
console.log(res);
