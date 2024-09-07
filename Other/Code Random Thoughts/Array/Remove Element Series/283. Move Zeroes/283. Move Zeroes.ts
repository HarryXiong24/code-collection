// 283. Move Zeroes

// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

// Example 1:
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

// Example 2:
// Input: nums = [0]
// Output: [0]

/**
 Do not return anything, modify nums in-place instead.
 */
export function moveZeroes(nums: number[]): void {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      const temp = nums[fast];
      nums[fast] = nums[slow];
      nums[slow] = temp;
      slow++;
    }
    fast++;
  }
}

// test
const arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
console.log(arr);
