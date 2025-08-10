// 18. 4Sum

// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

// Example 1:
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

// Example 2:
// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]

export function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);

  const k: number = 4;

  const result: number[][] = [];
  const quadruplet: number[] = [];

  // [-2, -1, 0, 0, 1, 2]
  const kSum = (k: number, kTarget: number, start: number = 0) => {
    if (k == 2) {
      let left: number = start;
      let right: number = nums.length - 1;

      while (left < right) {
        const sum: number = nums[left] + nums[right];
        if (sum < kTarget) {
          left = left + 1;
        } else if (sum > kTarget) {
          right = right - 1;
        } else {
          result.push(quadruplet.concat(nums[left], nums[right]));
          left = left + 1;
          while (nums[left] == nums[left - 1] && left < right) {
            left = left + 1;
          }
        }
      }
      return;
    }

    for (let i = start; i < nums.length - k + 1; i++) {
      if (i > start && nums[i] == nums[i - 1]) {
        continue;
      }
      quadruplet.push(nums[i]);
      kSum(k - 1, kTarget - nums[i], i + 1);
      quadruplet.pop();
    }
  };

  kSum(k, target, 0);

  return result;
}

// test
const res = fourSum([1, 0, -1, 0, -2, 2], 0);
console.log(res);
