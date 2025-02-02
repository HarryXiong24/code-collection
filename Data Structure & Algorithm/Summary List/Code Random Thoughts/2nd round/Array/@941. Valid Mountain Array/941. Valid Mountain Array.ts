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

export function validMountainArray(arr: number[]): boolean {
  let left = 0;
  let right = arr.length - 1;
  let peek = 0;

  if (arr.length <= 2) {
    return false;
  }

  while (left <= right) {
    if (arr[left] === arr[left + 1]) {
      return false;
    }

    if (arr[left] > arr[left + 1]) {
      if (left === 0 || left === right) {
        return false;
      }
      peek = left;
      break;
    }

    left++;
  }

  while (right > peek) {
    if (arr[right - 1] <= arr[right]) {
      return false;
    }
    right--;
  }

  return true;
}

// test
const res = validMountainArray([0, 3, 2, 1]);
console.log(res);
