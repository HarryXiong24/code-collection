// 922. Sort Array By Parity II

// Given an array of integers nums, half of the integers in nums are odd, and the other half are even.

// Sort the array so that whenever nums[i] is odd, i is odd, and whenever nums[i] is even, i is even.

// Return any answer array that satisfies this condition.

// Example 1:
// Input: nums = [4,2,5,7]
// Output: [4,5,2,7]
// Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.

// Example 2:
// Input: nums = [2,3]
// Output: [2,3]

export function sortArrayByParityII(nums: number[]): number[] {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (slow % 2 === 0) {
      if (nums[fast] % 2 === 0) {
        const temp = nums[slow];
        nums[slow] = nums[fast];
        nums[fast] = temp;
        slow++;
      } else {
        fast++;
      }
    } else {
      if (nums[fast] % 2 === 1) {
        const temp = nums[slow];
        nums[slow] = nums[fast];
        nums[fast] = temp;
        slow++;
      } else {
        fast++;
      }
    }
  }

  return nums;
}

// test
const res = sortArrayByParityII([3, 1, 4, 2]);
console.log(res);
