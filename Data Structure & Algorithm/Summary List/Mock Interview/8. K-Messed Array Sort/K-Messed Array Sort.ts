// K-Messed Array Sort

// Given an array of integers arr where each element is at most k places away from its sorted position, code an efficient function sortKMessedArray that sorts arr. For instance, for an input array of size 10 and k = 2, an element belonging to index 6 in the sorted array will be located at either index 4, 5, 6, 7 or 8 in the input array.

// Analyze the time and space complexities of your solution.

// Example:
// input:  arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9], k = 2
// output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function heapSort(nums: number[]) {
  const heapify = (nums: number[], length: number, current_index: number) => {
    let max_index = current_index;
    const left_index = 2 * current_index + 1;
    const right_index = 2 * current_index + 2;

    if (left_index < length && nums[left_index] > nums[max_index]) {
      max_index = left_index;
    }
    if (right_index < length && nums[right_index] > nums[max_index]) {
      max_index = right_index;
    }

    if (current_index !== max_index) {
      const temp = nums[current_index];
      nums[current_index] = nums[max_index];
      nums[max_index] = temp;
      heapify(nums, length, max_index);
    }
  };

  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, nums.length, i);
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    const temp = nums[i];
    nums[i] = nums[0];
    nums[0] = temp;
    heapify(nums, i, 0);
  }
}

export function sortKMessedArray(arr: number[], k: number) {
  const heap: number[] = [];

  for (let i = 0; i <= k; i++) {
    heap.push(arr[i]);
    heapSort(heap);
  }

  let index = 0;
  for (let i = k + 1; i < arr.length; i++) {
    arr[index] = heap.shift()!;
    index++;
    heap.push(arr[i]);
    heapSort(heap);
  }

  while (heap.length) {
    arr[index] = heap.shift()!;
    index++;
    heapSort(heap);
  }

  return arr;
}

// debug your code below
console.log(sortKMessedArray([1, 4, 5, 2, 3, 7, 8, 6, 10, 9], 2));
