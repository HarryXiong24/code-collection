// Shifted Array Search

// A sorted array of distinct integers shiftArr is shifted to the left by an unknown offset and you don't have a pre-shifted copy of it. For instance, the sequence 1, 2, 3, 4, 5 becomes 3, 4, 5, 1, 2, after shifting it twice to the left.

// Given shiftArr and an integer num, implement a function shiftedArrSearch that finds and returns the index of num in shiftArr. If num isn’t in shiftArr, return -1. Assume that the offset can be any value between 0 and arr.length - 1.

// Explain your solution and analyze its time and space complexities.

// Example:
// input:  shiftArr = [9, 12, 17, 2, 4, 5], num = 2 # shiftArr is the
//                                                  # outcome of shifting
//                                                  # [2, 4, 5, 9, 12, 17]
//                                                  # three times to the left

// output: 3 # since it’s the index of 2 in arr

function findPivotPoint(arr) {
  begin = 0;
  end = arr.length - 1;

  while (begin <= end) {
    mid = begin + Math.floor((end - begin) / 2);
    if (mid == 0 || arr[mid] < arr[mid - 1]) {
      return mid;
    }
    if (arr[mid] > arr[0]) {
      begin = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return 0;
}

function binarySearch(arr, begin, end, num) {
  while (begin <= end) {
    mid = begin + Math.floor((end - begin) / 2);
    if (arr[mid] < num) {
      begin = mid + 1;
    } else if (arr[mid] == num) {
      return mid;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

export function shiftedArrSearch(shiftArr, num) {
  pivot = findPivotPoint(shiftArr);

  if (pivot == 0 || num < shiftArr[0]) {
    return binarySearch(shiftArr, pivot, shiftArr.length - 1, num);
  }

  return binarySearch(shiftArr, 0, pivot, num);
}

// test
const res = shiftedArrSearch([9, 12, 17, 2, 4, 5], 2);
console.log(res);
