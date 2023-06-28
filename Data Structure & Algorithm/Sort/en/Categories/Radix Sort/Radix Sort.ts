// Radix Sort

/**
 * A problem we encounter with counting sort is that it can’t easily handle strings where the alphabet size could be unconstrained.
 * Additionally, when the maximum value of the array is extraordinarily large, counting sort will lose its appeal since the additional memory overhead can cause things to slow down quite a bit.
 *
 * Here is the full LSD radix sort algorithm for integers.
 * 1. Find the number of digits in the maximum integer. Let that be W
 * 2. For each integer, loop through digits from 1 to W in right to left order (least significant to most significant digit) * On each group of digits, perform counting sort
 *
 *
 * Let W be the maximum digit length within the list of integers.
 * Let N be the size of the original input integer array.
 * And lastly, since we are using counting sort, we must also be aware of the alphabet size K.
 *
 * Time Complexity: O(W * (N + K))
 * Space Complexity: O(N + K)
 * It is a stable sorting algorithm.
 *
 * Hint: If the array includes negative number, you should use it carefully.
 * A key assumption in the above version of counting sort is that the minimum possible value in the array is 0 (no negative numbers) and the maximum value is some positive integer K.
 */

function customizedCountingSort(nums: number[], placeVal: number, k = 10) {
  const counts = new Array(k).fill(0);

  for (const item of nums) {
    const digit = Math.floor(item / placeVal) % 10;
    counts[digit]++;
  }

  let sum = 0;
  let temp = 0;
  for (let i = 0; i < counts.length; i++) {
    sum = sum + temp;
    temp = counts[i];
    counts[i] = sum;
  }

  const sortArray = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    const digit = Math.floor(nums[i] / placeVal) % 10;
    const index = counts[digit];
    const value = nums[i];
    sortArray[index] = value;
    counts[digit]++;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = sortArray[i];
  }
}

export function radixSort(nums: number[]) {
  const min = Math.min(...nums);
  let reflect = 0;
  if (min < 0) {
    reflect = Math.abs(0 - min);
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + reflect;
  }

  const max = Math.max(...nums);
  let placeVal = 1;
  while (placeVal <= max) {
    customizedCountingSort(nums, placeVal);
    placeVal *= 10;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] - reflect;
  }
}

// test
const array = [831, 443, 256, 336, 736, 907, 3, 21323, 54];
radixSort(array);
console.log(array);
