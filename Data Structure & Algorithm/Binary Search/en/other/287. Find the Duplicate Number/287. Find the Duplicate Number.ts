// 287. Find the Duplicate Number

// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
// There is only one repeated number in nums, return this repeated number.
// You must solve the problem without modifying the array nums and uses only constant extra space.

// Example 1:
// Input: nums = [1,3,4,2,2]
// Output: 2

// Example 2:
// Input: nums = [3,1,3,4,2]
// Output: 3

export function findDuplicate(nums: number[]): number {
  let left = 1;
  let right = nums.length - 1;
  let duplicate = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    let count = 0;
    for (let num of nums) {
      if (num <= mid) {
        count++;
      }
    }
    if (count > mid) {
      duplicate = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return duplicate;
}

// test
const res = findDuplicate([1, 3, 4, 2, 2]);
console.log(res);
