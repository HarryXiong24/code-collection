// 35. Search Insert Position

// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:
// Input: nums = [1,3,5,6], target = 5
// Output: 2

// Example 2:
// Input: nums = [1,3,5,6], target = 2
// Output: 1

// Example 3:
// Input: nums = [1,3,5,6], target = 7
// Output: 4

export function searchInsert(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    } else if (i !== nums.length - 1 && nums[i] < target && nums[i + 1] > target) {
      return i + 1;
    }
  }

  // bound
  if (nums[nums.length - 1] < target) {
    return nums.length;
  }

  // bound
  if (nums[0] > target) {
    return 0;
  }

  return -1;
}

// test
const res = searchInsert([1, 3, 5, 6], 5);
console.log(res);
