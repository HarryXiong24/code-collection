// 47. Permutations II

// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

// Example 1:
// Input: nums = [1,1,2]
// Output:
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]

// Example 2:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

export function permuteUnique(nums: number[]): number[][] {
  const results: number[][] = [];
  const usedTotal: boolean[] = [];

  nums.sort((a, b) => a - b);

  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      results.push([...path]);
      return;
    }

    const used = new Set();
    for (let i = 0; i < nums.length; i++) {
      if (usedTotal[i] === true) {
        continue;
      }

      if (used.has(nums[i])) {
        continue;
      }
      used.add(nums[i]);

      path.push(nums[i]);
      usedTotal[i] = true;
      backtrack(path);
      usedTotal[i] = false;
      path.pop();
    }
  };

  backtrack([]);
  return results;
}

// test
const res = permuteUnique([1, 1, 2]);
console.log(res);
