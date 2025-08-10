// 209. Minimum Size Subarray Sum

// Given an array of positive integers nums and a positive integer target, return the minimal length of a
// subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1

// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

export function minSubArrayLen(target: number, nums: number[]): number {
  let max = Number.MAX_VALUE;
  let slow = 0;
  let fast = slow;
  while (slow < nums.length) {
    let sum = 0;
    while (fast < nums.length) {
      sum = sum + nums[fast];
      if (sum >= target) {
        break;
      } else {
        fast++;
      }
    }
    if (sum >= target && fast - slow + 1 < max) {
      max = fast - slow + 1;
    }
    slow++;
    fast = slow;
  }
  return max !== Number.MAX_VALUE ? max : 0;
}

// optimize
export function minSubArrayLen1(target: number, nums: number[]): number {
  let max = Number.MAX_VALUE;
  let slow = 0;
  let sum = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    sum = sum + nums[fast];
    while (sum >= target) {
      if (fast + 1 - slow < max) {
        max = fast + 1 - slow;
      }
      sum = sum - nums[slow];
      slow++;
    }
  }
  return max != Number.MAX_VALUE ? max : 0;
}

// test
const res = minSubArrayLen(15, [1, 2, 3, 4, 5]);
const res1 = minSubArrayLen1(15, [1, 2, 3, 4, 5]);
console.log(res);
console.log(res1);
