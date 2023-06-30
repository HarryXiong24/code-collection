// 1. Two Sum

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

// fast and slow double point
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function twoSum_doublePoint(nums: number[], target: number): number[] {
  let slow = 0;
  let fast = slow + 1;

  while (slow < nums.length - 1) {
    while (fast < nums.length) {
      const sum = nums[slow] + nums[fast];
      if (sum === target) {
        return [slow, fast];
      }
      fast++;
    }
    slow++;
    fast = slow + 1;
  }

  return [];
}

// map
// Time Complexity: O(n)
// Space Complexity: O(n)
export function twoSum_map(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  // It doesn't matter if the same value is overridden
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i++) {
    // map.get(target - nums[i]) !== i is necessary
    if (map.has(target - nums[i]) && map.get(target - nums[i]) !== i) {
      return [i, map.get(target - nums[i])!];
    }
  }

  return [];
}

// test
const res1 = twoSum_doublePoint([3, 2, 4], 6);
const res2 = twoSum_map([3, 2, 4], 6);
console.log(res1);
console.log(res2);
