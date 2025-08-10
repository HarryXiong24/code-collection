// 702. Search in a Sorted Array of Unknown Size

// This is an interactive problem.

// You have a sorted array of unique elements and an unknown size. You do not have an access to the array but you can use the ArrayReader interface to access it. You can call ArrayReader.get(i) that:

// returns the value at the ith index (0-indexed) of the secret array (i.e., secret[i]), or
// returns 231 - 1 if the i is out of the boundary of the array.
// You are also given an integer target.

// Return the index k of the hidden array where secret[k] == target or return -1 otherwise.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:
// Input: secret = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in secret and its index is 4.

// Example 2:
// Input: secret = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in secret so return -1.

abstract class ArrayReader {
  // This is the ArrayReader's API interface.
  // You should not implement it, or speculate about its implementation
  abstract get(index: number): number;
}

export function search(reader: ArrayReader, target: number): number {
  const findMaxIndex = (): number => {
    let left = 1;
    let right = 10000;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (reader.get(mid) >= 2 ** 31 - 1) {
        right = mid - 1;
      } else if (reader.get(mid) < 2 ** 31 - 1) {
        left = mid + 1;
      }
    }
    return left - 1;
  };

  let left = 0;
  let right = findMaxIndex();

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (reader.get(mid) < target) {
      left = mid + 1;
    } else if (reader.get(mid) > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}
