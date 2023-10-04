// 410. Split Array Largest Sum

// Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

// Return the minimized largest sum of the split.

// A subarray is a contiguous part of the array.

// Example 1:
// Input: nums = [7,2,5,10,8], k = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.

// Example 2:
// Input: nums = [1,2,3,4,5], k = 2
// Output: 9
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.

export function splitArray(nums: number[], k: number): number {
  let left = Math.max(...nums);
  let right = nums.reduce((prev, curr) => prev + curr);

  const valid = (mid: number, nums: number[], k: number) => {
    let count = 1;
    let total = 0;
    for (const item of nums) {
      total += item;
      if (total > mid) {
        total = item;
        count++;
        if (count > k) {
          return false;
        }
      }
    }

    return true;
  };

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (valid(mid, nums, k)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// test
const res = splitArray([7, 2, 5, 10, 8], 2);
console.log(res);
