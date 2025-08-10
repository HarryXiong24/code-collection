// 75. Sort Colors

// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

// You must solve this problem without using the library's sort function.

// Example 1:
// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]

// Example 2:
// Input: nums = [2,0,1]
// Output: [0,1,2]

/**
 Do not return anything, modify nums in-place instead.
 */

export function sortColors(nums: number[]): void {
  // 注意区间的开闭，初始化时区间内应该没有元素
  // 所以我们定义 [0，p0) 是元素 0 的区间，(p2, nums.length - 1] 是 2 的区间
  let p0 = 0;
  let p2 = nums.length - 1;

  let p = 0;

  const swap = (nums: number[], i: number, j: number) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  // 由于 p2 是开区间，所以 p <= p2
  while (p <= p2) {
    if (nums[p] === 0) {
      swap(nums, p0, p);
      p0++;
    } else if (nums[p] === 2) {
      swap(nums, p2, p);
      p2--;
    } else if (nums[p] === 1) {
      p++;
    }

    // 因为小于 p0 都是 0，所以 p 不要小于 p0
    if (p < p0) {
      p = p0;
    }
  }
}

function sortColors1(nums: number[]): void {
  let slow = 0;
  let fast = 0;

  while (slow < nums.length) {
    fast = slow;
    while (fast < nums.length) {
      if (nums[slow] > nums[fast]) {
        const temp = nums[fast];
        nums[fast] = nums[slow];
        nums[slow] = temp;
      }
      fast++;
    }
    slow++;
  }
}

// test
const nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums);
