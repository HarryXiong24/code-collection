// 747. Largest Number At Least Twice of Others

// You are given an integer array nums where the largest integer is unique.
// Determine whether the largest element in the array is at least twice as much as every other number in the array. If it is, return the index of the largest element, or return -1 otherwise.

// Example 1:
// Input: nums = [3,6,1,0]
// Output: 1
// Explanation: 6 is the largest integer.
// For every other number in the array x, 6 is at least twice as big as x.
// The index of value 6 is 1, so we return 1.

// Example 2:
// Input: nums = [1,2,3,4]
// Output: -1
// Explanation: 4 is less than twice the value of 3, so we return -1.

export function dominantIndex(nums: number[]): number {
  let max = 0;
  let maxIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      maxIndex = i;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] * 2 > max && i !== maxIndex) {
      return -1;
    }
  }
  return maxIndex;
}

// better
// 排序之后只需要比较第二个元素和第一个元素的大小
export function dominantIndex2(nums: number[]): number {
  const [x, y]: number[] = [...nums].sort((a, b) => b - a);
  if (x >= y * 2) {
    return nums.indexOf(x);
  }
  return -1;
}

// test
const res = dominantIndex([3, 6, 1, 0]);
console.log(res);
