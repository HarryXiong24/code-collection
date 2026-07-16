function heapify(nums: number[], length: number, current_index: number) {
  let max_index = current_index;
  let left_index = 2 * current_index + 1;
  let right_index = 2 * current_index + 2;

  if (left_index < length && nums[left_index] > nums[max_index]) {
    max_index = left_index;
  }
  if (right_index < length && nums[right_index] > nums[max_index]) {
    max_index = right_index;
  }

  if (max_index !== current_index) {
    const temp = nums[max_index];
    nums[max_index] = nums[current_index];
    nums[current_index] = temp;
    heapify(nums, length, max_index);
  }
}

export function heapSort(nums: number[]) {
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, nums.length, i);
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    const temp = nums[0];
    nums[0] = nums[i];
    nums[i] = temp;
    heapify(nums, i, 0);
  }
}

// test
const array = [2, 0, 2, 1, 1, 0, -3, -4];
heapSort(array);
console.log(array);
