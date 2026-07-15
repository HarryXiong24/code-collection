// 448. Find All Numbers Disappeared in an Array

// Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

// Example 1:
// Input: nums = [4,3,2,7,8,2,3,1]
// Output: [5,6]

// Example 2:
// Input: nums = [1,1]
// Output: [2]

// Using Map
// Time Complexity: O(n)
// Space Complexity: O(1)
export function findDisappearedNumbers(nums: number[]): number[] {
  const max = nums.length;
  const map = new Map<number, boolean>();
  const res: number[] = [];

  for (let i = 1; i <= max; i++) {
    map.set(i, false);
  }

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], true);
  }

  for (const [key, value] of map.entries()) {
    if (value === false) {
      res.push(key);
    }
  }

  return res;
}

// test
const res = findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]);
console.log(res);
