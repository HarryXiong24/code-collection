// 1658. Minimum Operations to Reduce X to Zero

// You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.

// Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.

// Example 1:
// Input: nums = [1,1,4,2,3], x = 5
// Output: 2
// Explanation: The optimal solution is to remove the last two elements to reduce x to zero.

// Example 2:
// Input: nums = [5,6,7,8,9], x = 4
// Output: -1

// Example 3:
// Input: nums = [3,2,20,1,1,3], x = 10
// Output: 5
// Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.

// This problem is equivalent to finding the longest subarray whose sum equals sum(nums) - x.
export function minOperations(nums: number[], x: number): number {
  const sum = nums.reduce((pre, cur) => pre + cur);
  const target = sum - x;

  let slow = 0;
  let fast = 0;

  let res = 0;
  let operator = -1;

  while (fast < nums.length) {
    res += nums[fast];

    if (res >= target) {
      while (res >= target) {
        if (res === target) {
          operator = Math.max(operator, fast - slow + 1);
        }
        res -= nums[slow];
        slow++;
      }
    }

    fast++;
  }

  return nums.length - operator > nums.length ? -1 : nums.length - operator;
}

// test
const res = minOperations([3, 2, 20, 1, 1, 3], 10);
console.log(res);
