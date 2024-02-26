// 704. Binary Search

// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:
// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4

// Example 2:
// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1

// Binary Search
// Time Complexity: O(log⁡n)
// Space Complexity: O(1)
export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

// Find Upper Boundary(<= target)
// Time Complexity: O(log⁡n)
// Space Complexity: O(1)
export function search_upper(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left - 1 >= 0 && nums[left - 1] === target) {
    return left - 1;
  } else {
    return -1;
  }
}

// Find Lower Boundary(>= target)
// Time Complexity: O(log⁡n)
// Space Complexity: O(1)
export function search_lower(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (right + 1 < nums.length && nums[right + 1] === target) {
    return right + 1;
  } else {
    return -1;
  }
}

// test
const res = search([-1, 0, 3, 5, 9, 12], 9);
const res1 = search_upper([-1, 0, 3, 5, 9, 12], 9);
const res2 = search_lower([-1, 0, 3, 5, 9, 12], 9);
console.log(res);
console.log(res1);
console.log(res2);
