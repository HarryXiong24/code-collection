// 167. Two Sum II - Input Array Is Sorted

// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
// Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
// The tests are generated such that there is exactly one solution. You may not use the same element twice.
// Your solution must use only constant extra space.

// Example 1:
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

// Example 2:
// Input: numbers = [2,3,4], target = 6
// Output: [1,3]
// Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

// Example 3:
// Input: numbers = [-1,0], target = -1
// Output: [1,2]
// Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

// fast & slow double point
export function twoSum(numbers: number[], target: number): number[] {
  let slow = 0;
  let fast = slow + 1;
  while (slow < numbers.length) {
    while (fast < numbers.length) {
      if (numbers[slow] + numbers[fast] === target) {
        return [slow + 1, fast + 1];
      }
      fast++;
    }
    slow++;
    fast = slow + 1;
  }

  return [-1, -1];
}

// left and right double point
export function twoSum1(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1];
    } else if (numbers[left] + numbers[right] < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
}

// test
const res = twoSum([-1, 1, 0, 15], -1);
const res1 = twoSum1([-1, 1, 0, 15], -1);
console.log(res);
console.log(res1);
