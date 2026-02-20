// 55. Jump Game

// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.

// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

// Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

// DFS
// Time Limit Exceeded
export function canJump(nums: number[]): boolean {
  const final = nums.length - 1;
  let flag = false;

  if (nums.length === 1) {
    return true;
  }

  const recursive = (index: number) => {
    if (index === final || flag === true) {
      flag = true;
      return;
    }
    if (index !== final && nums[index] === 0) {
      return;
    }
    if (index >= nums.length) {
      return;
    }
    for (let i = 1; i <= nums[index]; i++) {
      recursive(index + i);
    }
  };

  recursive(0);
  return flag;
}

// T: O(n)
// S: O(1)
// We just need to consider last step
export function canJump_better(nums: number[]): boolean {
  let lastJump = nums.length - 1;

  for (let i = lastJump - 1; i > 0; i--) {
    if (nums[i] >= lastJump - i) {
      lastJump = i;
    }
  }

  return nums[0] >= lastJump;
}

// test
const res = canJump([2, 0, 0]);
console.log(res);
