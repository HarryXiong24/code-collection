// 941. Valid Mountain Array

// Given an array of integers arr, return true if and only if it is a valid mountain array.

// Recall that arr is a mountain array if and only if:

// arr.length >= 3
// There exists some i with 0 < i < arr.length - 1 such that:
// arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
// arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

// Example 1:
// Input: arr = [2,1]
// Output: false

// Example 2:
// Input: arr = [3,5,5]
// Output: false

// Example 3:
// Input: arr = [0,3,2,1]
// Output: true

// Time Complexity: O(n)
// Space Complexity: O(1)
export function validMountainArray(arr: number[]): boolean {
  let max = arr[0];
  let max_index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
      max_index = i;
    }
  }

  // case [4, 4, 3, 2], [2, 3, 5, 5]
  if (max_index === 0 || max_index === arr.length - 1 || arr[0] === max || arr[arr.length - 1] === max) {
    return false;
  }

  for (let i = max_index - 1; i >= 1; i--) {
    if (arr[i] <= arr[i - 1]) {
      return false;
    }
  }

  for (let i = max_index + 1; i < arr.length - 1; i++) {
    if (arr[i + 1] >= arr[i]) {
      return false;
    }
  }

  return true;
}

// test
const res = validMountainArray([1, 1, 1, 1, 1, 1, 1, 2, 1]);
console.log(res);
