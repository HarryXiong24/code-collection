// 487. Max Consecutive Ones II

// Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

// Example 1:
// Input: nums = [1,0,1,1,0]
// Output: 4
// Explanation:
// - If we flip the first zero, nums becomes [1,1,1,1,0] and we have 4 consecutive ones.
// - If we flip the second zero, nums becomes [1,0,1,1,1] and we have 3 consecutive ones.
// The max number of consecutive ones is 4.

// Example 2:
// Input: nums = [1,0,1,1,0,1]
// Output: 4
// Explanation:
// - If we flip the first zero, nums becomes [1,1,1,1,0,1] and we have 4 consecutive ones.
// - If we flip the second zero, nums becomes [1,0,1,1,1,1] and we have 4 consecutive ones.
// The max number of consecutive ones is 4.

// slide window
export function findMaxConsecutiveOnes(nums: number[]): number {
  let slow = 0;
  let fast = 0;

  let zero_nums = 0;
  let max = 0;

  while (fast < nums.length) {
    if (nums[fast] === 0) {
      zero_nums++;
    }

    while (zero_nums > 1) {
      if (nums[slow] === 0) {
        zero_nums--;
      }
      slow++;
    }

    if (fast - slow + 1 > max) {
      max = fast - slow + 1;
    }
    fast++;
  }

  return max;
}

// test
const res = findMaxConsecutiveOnes([1, 1, 0, 1]);
console.log(res);
