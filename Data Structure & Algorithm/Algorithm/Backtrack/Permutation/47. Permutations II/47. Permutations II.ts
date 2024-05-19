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
  const path: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  const backtrack = (used: boolean[]) => {
    if (path.length === nums.length) {
      results.push([...path]);
      return;
    }

    const rowUsed = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
      if (used[i] === true || rowUsed.has(nums[i])) {
        continue;
      }
      rowUsed.add(nums[i]);

      path.push(nums[i]);
      used[i] = true;
      backtrack(used);
      path.pop();
      used[i] = false;
    }
  };

  backtrack(used);

  return results;
}

// test
const res = permuteUnique([1, 1, 2]);
console.log(res);
