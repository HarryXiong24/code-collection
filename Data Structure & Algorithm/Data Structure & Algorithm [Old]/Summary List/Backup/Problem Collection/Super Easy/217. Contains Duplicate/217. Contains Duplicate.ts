// 217. Contains Duplicate

// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

// Example 1:
// Input: nums = [1,2,3,1]
// Output: true

// Example 2:
// Input: nums = [1,2,3,4]
// Output: false

// Example 3:
// Input: nums = [1,1,1,3,3,4,3,2,4,2]
// Output: true

// Using set
// Time Complexity: O(1)
// Space Complexity: O(n)
export function containsDuplicate_Set(nums: number[]): boolean {
  const set = new Set(nums);
  return set.size !== nums.length;
}

// Using map
// Time Complexity: O(n)
// Space Complexity: O(n)
export function containsDuplicate_Map(nums: number[]): boolean {
  const map = new Map<number, number>();

  for (const item of nums) {
    if (map.has(item)) {
      return true;
    } else {
      map.set(item, 1);
    }
  }

  return false;
}

// test
const res1 = containsDuplicate_Set([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);
const res2 = containsDuplicate_Map([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);
console.log(res1);
console.log(res2);
