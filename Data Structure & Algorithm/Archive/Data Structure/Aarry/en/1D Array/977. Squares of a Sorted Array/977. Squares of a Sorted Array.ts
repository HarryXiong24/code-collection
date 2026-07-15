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

// Time Complexity: O(n)
// Space Complexity: O(n)
export function sortedSquares(nums: number[]): number[] {
  let left: number = 0;
  let right: number = nums.length - 1;
  let current: number = right;
  const squares: number[] = new Array(nums.length);

  while (left <= right) {
    if (Math.abs(nums[right]) > Math.abs(nums[left])) {
      squares[current] = nums[right] ** 2;
      current--;
      right--;
    } else {
      squares[current] = nums[left] ** 2;
      current--;
      left++;
    }
  }

  return squares;
}

// test
const res = sortedSquares([-4, -1, 0, 3, 10]);
console.log(res);
