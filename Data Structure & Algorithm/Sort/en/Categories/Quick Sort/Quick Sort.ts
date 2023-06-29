// Quick Sort

/**
 * Quick sort uses the recursive method.
 * It selects an element in the array as the "pivot" element
 * And put the elements smaller than the pivot into one array and the elements larger than the pivot into the other array.
 * Then, recursively sort the two arrays and combine them with the pivot to get the final sorted array
 *
 * Time Complexity: O(n * log n)
 * Space Complexity: O(log n)
 * It is not a stable sorting algorithm.
 */

export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  const smallerArr = [];
  const largerArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) {
      continue;
    }
    if (arr[i] < pivot) {
      smallerArr.push(arr[i]);
    } else {
      largerArr.push(arr[i]);
    }
  }

  return [...quickSort(smallerArr), pivot, ...quickSort(largerArr)];
}

// test
const array = [2, 0, 2, 1, 1, 0, -3, -4];
const res = quickSort(array);
console.log(res);
