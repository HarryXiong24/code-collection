// Heap Sort

/**
 * Time Complexity: O(n * log n)
 * Space Complexity: O(1)
 * It is not a stable sorting algorithm.
 */

function heapify(nums: number[], length: number, current_index: number) {
  // represents the largest index of node value in this round
  let largest_index = current_index;
  // the index of left child value
  const left = 2 * current_index + 1;
  // the index of right child value
  const right = 2 * current_index + 2;

  // find the largest index of node value in this round
  if (left < length && nums[left] > nums[largest_index]) {
    largest_index = left;
  }
  if (right < length && nums[right] > nums[largest_index]) {
    largest_index = right;
  }

  // if the maximum index is not the root node, swap the root node and maximum node, and recursively call the heap function
  if (largest_index !== current_index) {
    const temp = nums[current_index];
    nums[current_index] = nums[largest_index];
    nums[largest_index] = temp;
    heapify(nums, length, largest_index);
  }
}

export function heapSort(nums: number[]) {
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, nums.length, i);
  }

  let temp = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    temp = nums[i];
    nums[i] = nums[0];
    nums[0] = temp;
    heapify(nums, i, 0);
  }
}

// test
const array = [2, 0, 2, 1, 1, 0, -3, -4];
heapSort(array);
console.log(array);
