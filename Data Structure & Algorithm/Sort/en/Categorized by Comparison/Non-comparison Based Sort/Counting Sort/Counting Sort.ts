// Counting Sort

/**
 * Time Complexity: O(N + K), where N is the size of the input array and K is the maximum value in the array.
 * Space Complexity: O(N + K), since we have to initialize a new array of size N and a counts array of size K+1.
 * It is a stable sorting algorithm.
 *
 * Hint: If the array includes negative number, it is not a good choice to use Counting Sort.
 * A key assumption in the above version of counting sort is that the minimum possible value in the array is 0 (no negative numbers) and the maximum value is some positive integer K.
 * If this is not the case, it's possible to perform a mapping step at the beginning and then remap the values to the original array at the end.
 * For example, an array with values between -5 and 10 can be mapped to values between 0 and 15, perform counting sort, and then remap to the original -5 to 10 range.
 */

export function countingSort(nums: number[]): number[] {
  // Find the max value
  let max = nums[0];
  for (const item of nums) {
    if (item > max) {
      max = item;
    }
  }

  // Structure a counting array and record the number of each element in the array
  const countArray = new Array(max + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    countArray[nums[i]] = countArray[nums[i]] + 1;
  }

  // We now overwrite our original counts with the starting index of each element in the final sorted array
  let sum = 0;
  let temp = 0;
  for (let i = 0; i < countArray.length; i++) {
    sum = sum + temp;
    temp = countArray[i];
    countArray[i] = sum;
  }

  // Since we have placed an item in index counts[elem], we need to increment counts[elem] index by 1
  // So the next duplicate element is placed in appropriate index
  const sortedArray = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    const index = countArray[nums[i]];
    const value = nums[i];
    sortedArray[index] = value;
    countArray[nums[i]]++;
  }

  return sortedArray;
}

// test
const array = [2, 0, 2, 1, 1, 0];
const res = countingSort(array);
console.log(res);
