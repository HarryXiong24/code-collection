// 713. Subarray Product Less Than K

// Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

// Example 1:
// Input: nums = [10,5,2,6], k = 100
// Output: 8
// Explanation: The 8 subarrays that have product less than 100 are:
// [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
// Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

// Example 2:
// Input: nums = [1,2,3], k = 0
// Output: 0

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  let slow = 0;
  let fast = 0;

  let product = 1;
  let count = 0;

  while (fast < nums.length) {
    product *= nums[fast];

    if (product < k) {
      count++;
    }

    if (product >= k) {
      while (product - nums[slow] >= k) {
        product /= nums[slow];
        slow++;
      }
      count++;
    }

    fast++;
  }

  while (slow < nums.length) {
    count++;
    slow++;
  }

  return count;
}

// test
const res = numSubarrayProductLessThanK([10, 5, 2, 6], 100);
console.log(res);
