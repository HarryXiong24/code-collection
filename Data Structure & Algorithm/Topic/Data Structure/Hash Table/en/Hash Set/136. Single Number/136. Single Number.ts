// 136. Single Number

// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

// Example 1:
// Input: nums = [2,2,1]
// Output: 1

// Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4

// Example 3:
// Input: nums = [1]
// Output: 1

export function singleNumber(nums: number[]): number {
  const set = new Set<number>();
  for (const item of nums) {
    if (set.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
  }
  return [...set][0];
}

// test
const res = singleNumber([4, 1, 2, 1, 2]);
console.log(res);
