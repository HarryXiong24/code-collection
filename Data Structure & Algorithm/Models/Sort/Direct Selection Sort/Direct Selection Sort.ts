// Direct Selection Sort

/**
 * Suppose we had a collection of elements where every element is an integer.
 * Selection sort will build up the sorted list by repeatedly finding the minimum element in that list and moving it to the front of the list through a swap.
 * It will proceed to swap elements appropriately until the entire list is sorted.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * It is not a stable sorting algorithm.
 */

export function selectionSort(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    let min = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[min] > nums[j]) {
        min = j;
      }
    }
    const temp = nums[i];
    nums[i] = nums[min];
    nums[min] = temp;
  }
}

// test
const array = [10, 1, 3, 2, 9, 1, 5, 6];
selectionSort(array);
console.log(array);
