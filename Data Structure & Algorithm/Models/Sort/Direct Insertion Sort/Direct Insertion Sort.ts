// Direct Insertion Sort

/**
 * This is the core intuition behind insertion sort.
 * Given a collection of integers, you can sort the list by proceeding from the start of the list, and every time you encounter an element that is out of order, you can continuously swap places with previous elements until it is inserted in its correct relative location based on what you’ve processed thus far.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * It is a stable sorting algorithm.
 */

export function insertSort(nums: number[]) {
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] > current) {
        nums[j + 1] = nums[j];
        nums[j] = current;
      }
    }
  }
}

export function insertSort1(nums: number[]): void {
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > current) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = current;
  }
}

// test
const array = [5, 3, 1, 2, 4];
insertSort(array);
console.log(array);
