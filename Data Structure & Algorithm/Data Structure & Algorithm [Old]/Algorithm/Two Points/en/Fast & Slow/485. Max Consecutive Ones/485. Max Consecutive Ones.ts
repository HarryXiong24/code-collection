// 485. Max Consecutive Ones

// Given a binary array nums, return the maximum number of consecutive 1's in the array.

// Example 1:
// Input: nums = [1,1,0,1,1,1]
// Output: 3
// Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

// Example 2:
// Input: nums = [1,0,1,1,0,1]
// Output: 2

export function findMaxConsecutiveOnes(nums: number[]): number {
  let res = 0;

  let slow = 0;
  let fast = slow;
  while (slow < nums.length) {
    while (nums[fast] === 1) {
      fast++;
    }
    if (fast - slow > res) {
      res = fast - slow;
    }
    slow++;
    fast = slow;
  }

  return res;
}

// test
const res = findMaxConsecutiveOnes([0, 1, 1, 0, 1, 1, 1]);
console.log(res);
