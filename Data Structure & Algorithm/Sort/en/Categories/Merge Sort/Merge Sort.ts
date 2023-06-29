// Merge Sort

/**
 * Quick sort uses the recursive method.
 * It selects an element in the array as the "pivot" element
 * And put the elements smaller than the pivot into one array and the elements larger than the pivot into the other array.
 * Then, recursively sort the two arrays and combine them with the pivot to get the final sorted array
 *
 * Time Complexity: O(n * log n)
 * Space Complexity: O(n)
 * It is a stable sorting algorithm.
 */

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  // merge ordered left array and right array together
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }
  return result.concat(left, right);
}

// 对数组进行拆分
export function mergeSort(nums: number[]): number[] {
  // boundary condition
  if (nums.length <= 1) {
    return nums;
  }
  // divide array into two parts
  const middle: number = Math.floor(nums.length / 2);
  const left: number[] = nums.slice(0, middle);
  const right: number[] = nums.slice(middle);

  // recursive
  return merge(mergeSort(left), mergeSort(right));
}

// test
const res = mergeSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
