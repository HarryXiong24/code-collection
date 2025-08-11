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
  const results: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }

      let left = j + 1;
      let right = nums.length - 1;

      while (left < right) {
        if (nums[i] + nums[j] + nums[left] + nums[right] < target) {
          left++;
        } else if (nums[i] + nums[j] + nums[left] + nums[right] > target) {
          right--;
        } else {
          results.push([nums[i], nums[j], nums[left], nums[right]]);

          while (left < right && nums[left + 1] === nums[left]) {
            left++;
          }

          while (left < right && nums[right - 1] === nums[right]) {
            right--;
          }

          left++;
          right--;
        }
      }
    }
  }

  return results;
}

// test
const res = fourSum([1, 0, -1, 0, -2, 2], 0);
const res1 = fourSum([2, 2, 2, 2, 2], 8);
console.log(res);
console.log(res1);
