// 905. Sort Array By Parity

// Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.

// Return any array that satisfies this condition.

// Example 1:
// Input: nums = [3,1,2,4]
// Output: [2,4,3,1]
// Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

// Example 2:
// Input: nums = [0]
// Output: [0]

// Time Complexity: O(n)
// Space Complexity: O(1)
export function sortArrayByParity(nums: number[]): number[] {
  if (nums.length === 0) {
    return nums;
  }

  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] % 2 === 0) {
      const temp = nums[slow];
      nums[slow] = nums[fast];
      nums[fast] = temp;
      slow++;
    }
    fast++;
  }

  return nums;
}

// test
const res = sortArrayByParity([3, 1, 2, 4]);
console.log(res);
