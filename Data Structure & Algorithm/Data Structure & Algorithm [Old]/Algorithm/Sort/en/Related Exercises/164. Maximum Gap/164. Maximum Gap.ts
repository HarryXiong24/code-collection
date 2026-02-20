// 164. Maximum Gap

// Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.

// You must write an algorithm that runs in linear time and uses linear extra space.

// Example 1:
// Input: nums = [3,6,9,1]
// Output: 3
// Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.

// Example 2:
// Input: nums = [10]
// Output: 0
// Explanation: The array contains less than 2 elements, therefore return 0.

function countingSort(nums: number[], placeVal: number, k = 10) {
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

function radixSort(nums: number[]) {
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
    countingSort(nums, placeVal);
    placeVal *= 10;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] - reflect;
  }
}

export function maximumGap(nums: number[]): number {
  radixSort(nums);

  let maxDiff = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    maxDiff = Math.max(maxDiff, Math.abs(nums[i + 1] - nums[i]));
  }

  return maxDiff;
}

// test
const res = maximumGap([1, 3, 100]);
console.log(res);
