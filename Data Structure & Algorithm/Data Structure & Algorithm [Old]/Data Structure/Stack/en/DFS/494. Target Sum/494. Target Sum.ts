// 494. Target Sum

// You are given an integer array nums and an integer target.

// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

// For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
// Return the number of different expressions that you can build, which evaluates to target.

// Example 1:
// Input: nums = [1,1,1,1,1], target = 3
// Output: 5
// Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3

// Example 2:
// Input: nums = [1], target = 1
// Output: 1

// DFS
export function findTargetSumWays(nums: number[], target: number): number {
  let res_count = 0;

  const dfs = (i: number, cur: number) => {
    if (i === nums.length) {
      if (cur === target) {
        res_count++;
      }
      return;
    }

    const num = nums[i];

    dfs(i + 1, cur - num);
    dfs(i + 1, cur + num);
  };

  dfs(0, 0);

  return res_count;
}

export function findTargetSumWays_stack(nums: number[], target: number): number {
  let res_count = 0;
  const queue: number[] = [0];
  let layer = 0;

  while (queue.length && layer <= nums.length) {
    const size = queue.length;
    const supplement = nums[layer] || 0;

    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;

      if (current === target && layer === nums.length) {
        res_count++;
      }

      queue.push(current + supplement);
      queue.push(current - supplement);
    }
    layer++;
  }

  return res_count;
}

// test
const res = findTargetSumWays_stack([1, 1, 1, 1, 1], 3);
console.log(res);
