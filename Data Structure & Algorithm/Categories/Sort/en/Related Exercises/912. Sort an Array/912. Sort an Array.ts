// 912. Sort an Array

// Given an array of integers nums, sort the array in ascending order and return it.

// You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

// Example 1:
// Input: nums = [5,2,3,1]
// Output: [1,2,3,5]
// Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).

// Example 2:
// Input: nums = [5,1,1,2,0,0]
// Output: [0,0,1,1,2,5]
// Explanation: Note that the values of nums are not necessairly unique.

// Counting Sort
export function sortArray(nums: number[]): number[] {
  const min = Math.min(...nums);
  let reflect = 0;
  if (min < 0) {
    reflect = Math.abs(0 - min);
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + reflect;
  }

  const max = Math.max(...nums);
  const counts = new Array(max + 1).fill(0);

  for (const item of nums) {
    counts[item]++;
  }

  let sum = 0;
  let temp = 0;
  for (let i = 0; i < counts.length; i++) {
    sum = sum + temp;
    temp = counts[i];
    counts[i] = sum;
  }

  const sortedList = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    const index = counts[nums[i]];
    const value = nums[i];
    sortedList[index] = value;
    counts[nums[i]]++;
  }

  for (let i = 0; i < sortedList.length; i++) {
    sortedList[i] = sortedList[i] - reflect;
  }

  return sortedList;
}

// test
const res = sortArray([5, 1, 1, 2, 0, 0, -1]);
console.log(res);
