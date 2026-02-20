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

function customizedCountingSort(nums: number[], digit: number, count_volume = 10): void {
  // we just need 0-9 space in counter volume
  const countArray = new Array(count_volume).fill(0);

  for (const item of nums) {
    const current_digit = Math.floor(item / digit) % 10;
    countArray[current_digit]++;
  }

  // calculate the deviation of index in sorted array
  let sum = 0;
  let temp = 0;
  for (let i = 0; i < countArray.length; i++) {
    sum = sum + temp;
    temp = countArray[i];
    countArray[i] = sum;
  }

  const sortedArray = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    // here is important and notice the mapping relationship between current_digit and nums[i]
    const current_digit = Math.floor(nums[i] / digit) % 10;
    const index = countArray[current_digit];
    const value = nums[i];
    sortedArray[index] = value;
    countArray[current_digit]++;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = sortedArray[i];
  }
}

export function radixSort(nums: number[]) {
  // mapping
  const min = Math.min(...nums);
  const mapper = min < 0 ? Math.abs(0 - min) : 0;

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + mapper;
  }

  let digit = 1;
  const max = Math.max(...nums);
  // represents use Counting Sort in every digital number round
  while (digit <= max) {
    customizedCountingSort(nums, digit, 10);
    digit = digit * 10;
  }

  // remapping
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] - mapper;
  }
}

// test
const array = [831, 443, 256, 336, 736, 907, 3, 21323, 54];
radixSort(array);
console.log(array);
