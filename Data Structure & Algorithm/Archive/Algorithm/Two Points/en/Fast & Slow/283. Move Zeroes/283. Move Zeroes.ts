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

/**
 * 法一：
 * 使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部
 * 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移
 * 注意到以下性质：
 * 1.左指针左边均为非零数
 * 2.右指针左边直到左指针处均为零
 * 因此每次交换，都是将左指针的零与右指针的非零数交换，且非零数的相对顺序并未改变。
 */
export function moveZeroes(nums: number[]): void {
  let slow: number = 0;
  let fast: number = 0;
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

// move non-zero element to the front of array, and add 0 in the last
export function moveZeroes2(nums: number[]): void {
  let index: number = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] !== 0) {
      nums[index] = nums[i];
      index++;
    }
  }
  // add 0
  for (let i = index; i < len; i++) {
    nums[i] = 0;
  }
}

// test
const arr: number[] = [0, 1, 0, 3, 12];
const arr2: number[] = [0, 1, 0, 3, 12];
moveZeroes(arr);
moveZeroes2(arr2);
console.log(arr);
console.log(arr2);
