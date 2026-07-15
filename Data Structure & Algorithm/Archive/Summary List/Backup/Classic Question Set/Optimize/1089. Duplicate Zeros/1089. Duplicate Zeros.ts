// 1089. Duplicate Zeros

// Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.

// Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

// Example 1:
// Input: arr = [1,0,2,3,0,4,5,0]
// Output: [1,0,0,2,3,0,0,4]
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

// Example 2:
// Input: arr = [1,2,3]
// Output: [1,2,3]
// Explanation: After calling your function, the input array is modified to: [1,2,3]

/**
 Do not return anything, modify arr in-place instead.
 */
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function duplicateZeros(arr: number[]): void {
  let current = 0;
  const size = arr.length;

  while (current < size) {
    if (arr[current] === 0) {
      for (let i = size - 1; i >= current + 1; i--) {
        arr[i] = arr[i - 1];
      }
      if (current + 1 < size) {
        arr[current + 1] = 0;
      }
      current = current + 2;
    } else {
      current = current + 1;
    }
  }
}

// optimize
export function duplicateZeros1(arr: number[]): void {
  let count = 0;
  let flag = 0;
  let copy_from = 0;

  // find out which element is the end after duplicating
  for (let i = 0; i < arr.length; i++) {
    if (count >= arr.length) {
      break;
    }
    if (arr[i] === 0) {
      count = count + 2;
    } else {
      count = count + 1;
    }
    copy_from = i;
  }

  let copy_to = arr.length - 1;
  // flag means whether there is a extra 0
  flag = count > arr.length ? 1 : 0;

  while (copy_to >= 0) {
    if (arr[copy_from] === 0 && flag === 0) {
      arr[copy_to] = arr[copy_from];
      arr[copy_to - 1] = 0;
      copy_to--;
    } else if (arr[copy_from] === 0 && flag === 1) {
      arr[copy_to] = arr[copy_from];
      flag = 0;
    } else {
      arr[copy_to] = arr[copy_from];
    }
    copy_to--;
    copy_from--;
  }
}

// test
const arr = [8, 4, 5, 0, 0, 0, 0, 7];
duplicateZeros1(arr);
console.log(arr);
