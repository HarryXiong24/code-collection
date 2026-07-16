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

  // condition: arr.length >= 3
  if (arr.length <= 2) {
    return false;
  }

  let peek = 0;
  while (left < arr.length - 1) {
    if (arr[left] < arr[left + 1]) {
      left++;
    } else {
      peek = left;
      break;
    }
  }

  // peek cannot in the boundary
  if (peek === 0 || peek === arr.length - 1) {
    return false;
  }

  while (right > peek) {
    if (arr[right] < arr[right - 1]) {
      right--;
    } else {
      return false;
    }
  }

  return true;
}

export function validMountainArray1(arr: number[]): boolean {
  let left: number = 0;
  let right: number = arr.length - 1;

  if (arr.length < 3) {
    return false;
  }

  while (left < arr.length - 1 && arr[left] < arr[left + 1]) {
    left++;
  }

  while (right > 0 && arr[right] < arr[right - 1]) {
    right--;
  }

  if (left === right && left !== 0 && right !== arr.length - 1) {
    return true;
  }

  return false;
}

// test
const res = validMountainArray([0, 3, 2, 1]);
console.log(res);
