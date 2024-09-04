// 977. Squares of a Sorted Array

// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

// Example 1:
// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].

// Example 2:
// Input: nums = [-7,-3,2,3,11]
// Output: [4,9,9,49,121]

// Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?

export function sortedSquares(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;

  const result: number[] = [];

  while (left <= right) {
    if (Math.pow(nums[left], 2) >= Math.pow(nums[right], 2)) {
      result.unshift(Math.pow(nums[left], 2));
      left++;
    } else {
      result.unshift(Math.pow(nums[right], 2));
      right--;
    }
  }

  return result;
}

// test
const res = sortedSquares([-4, -1, 0, 3, 10]);
console.log(res);
