// 503. Next Greater Element II

// Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.

// The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.

// Example 1:
// Input: nums = [1,2,1]
// Output: [2,-1,2]
// Explanation: The first 1's next greater number is 2;
// The number 2 can't find next greater number.
// The second 1's next greater number needs to search circularly, which is also 2.

// Example 2:
// Input: nums = [1,2,3,4,3]
// Output: [2,3,4,-1,4]

export function nextGreaterElements(nums: number[]): number[] {
  const stack: number[] = [];
  const result: number[] = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length * 2; i++) {
    while (stack.length && nums[i % nums.length] > nums[stack[stack.length - 1]]) {
      const top = stack.pop()!;
      result[top] = nums[i % nums.length];
    }
    stack.push(i % nums.length);
  }

  return result;
}

// test
const res = nextGreaterElements([1, 2, 1]);
console.log(res);
