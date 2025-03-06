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

function nSum(nums: number[], n: number, start: number, target: number): number[][] {
  const res: number[][] = [];
  // 至少是 2Sum，且数组大小不应该小于 n
  if (n < 2 || nums.length < n) {
    return res;
  }
  if (n == 2) {
    // 2Sum 是 base case
    let left = start;
    let right = nums.length - 1;

    while (left < right) {
      if (nums[left] + nums[right] < target) {
        left++;
      } else if (nums[left] + nums[right] > target) {
        right--;
      } else {
        res.push([nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }

        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      }
    }
  } else {
    // n > 2 时，递归计算 (n-1)Sum 的结果
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i - 1] === nums[i]) {
        continue;
      }

      const sub = nSum(nums, n - 1, i + 1, target - nums[i]);
      for (const arr of sub) {
        res.push([...arr, nums[i]]);
      }
    }
  }
  return res;
}

export function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  return nSum(nums, 4, 0, target);
}

// test
const res = fourSum([1, 0, -1, 0, -2, 2], 0);
console.log(res);
