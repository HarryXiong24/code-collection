// 169. Majority Element

// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

// Example 1:
// Input: nums = [3,2,3]
// Output: 3

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// T: O(log n)
// S: O(1)
export function majorityElement(nums: number[]): number {
  nums.sort((a, b) => a - b);

  return nums[Math.floor(nums.length / 2)];
}

// other method is using a map to count.

// test
const res = majorityElement([2, 2, 1, 1, 1, 2, 2]);
console.log(res);
