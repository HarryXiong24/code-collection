// Bubble Sort

/**
 * Conceptually, bubble sort is an implementation of a rather simple idea.
 * Suppose we have a collection of integers that we want to sort in ascending order.
 * Bubble sort proceeds to consider two adjacent elements at a time.
 * If these two adjacent elements are out of order (in this case, the left element is strictly greater than the right element), bubble sort will swap them.
 * It then proceeds to the next pair of adjacent elements.
 * In the first pass of bubble sort, it will process every set of adjacent elements in the collection once, making swaps as necessary.
 * The core idea of bubble sort is it will repeat this process until no more swaps are made in a single pass, which means the list is sorted.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * It is a stable sorting algorithm.
 */

export function bubbleSort(nums: number[]) {
  // The outer loop is used to represent the count of exchanges
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
}

// optimize
export function bubbleSort1(nums: number[]) {
  // The outer loop is used to represent the count of exchanges
  for (let i = nums.length; i > 0; i--) {
    // Each round will put the maximum value of the current round at the end, so the scope of the end of loop can reduce
    for (let j = 0; j < i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
}

// test
const array = [10, 1, 3, 2, 9, 1, 5, 6];
bubbleSort1(array);
console.log(array);
