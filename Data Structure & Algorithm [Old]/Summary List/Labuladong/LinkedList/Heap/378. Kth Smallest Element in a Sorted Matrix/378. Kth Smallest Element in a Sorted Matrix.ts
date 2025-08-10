// 378. Kth Smallest Element in a Sorted Matrix

// Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.

// Note that it is the kth smallest element in the sorted order, not the kth distinct element.

// You must find a solution with a memory complexity better than O(n2).

// Example 1:
// Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
// Output: 13
// Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13

// Example 2:
// Input: matrix = [[-5]], k = 1
// Output: -5

export function kthSmallest(matrix: number[][], k: number): number {
  const heap: number[][] = [];
  const result: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    heap.push(matrix[i]);
  }

  let count = 0;
  while (count < k) {
    heap.sort((a, b) => a[0] - b[0]);

    const min = heap.shift()!;

    result.push(min.shift()!);

    if (min.length > 0) {
      heap.push(min);
    }

    count++;
  }

  return result[result.length - 1];
}

// test
const res = kthSmallest(
  [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15],
  ],
  8
);
console.log(res);
