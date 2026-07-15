// 219. Contains Duplicate II

// Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

// Example 1:
// Input: nums = [1,2,3,1], k = 3
// Output: true

// Example 2:
// Input: nums = [1,0,1,1], k = 1
// Output: true

// Example 3:
// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false

export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], i);
    } else {
      const current = map.get(nums[i])!;
      if (Math.abs(current - i) <= k) {
        return true;
      } else {
        // hint: in this place, we need to update the newly value of map.get(nums[i])
        // example [1,0,1,1]
        map.set(nums[i], i);
      }
    }
  }

  return false;
}

// test
const res = containsNearbyDuplicate([1, 0, 1, 1], 1);
console.log(res);
