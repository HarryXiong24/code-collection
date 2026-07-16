// 238. Product of Array Except Self

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

// Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

export function productExceptSelf(nums: number[]): number[] {
  const preProduct: number[] = new Array(nums.length).fill(0);
  const suffixProduct: number[] = new Array(nums.length).fill(0);

  preProduct[0] = nums[0];
  suffixProduct[nums.length - 1] = nums[nums.length - 1];

  for (let i = 1; i < nums.length; i++) {
    preProduct[i] = preProduct[i - 1] * nums[i];
  }

  for (let i = nums.length - 2; i >= 0; i--) {
    suffixProduct[i] = suffixProduct[i + 1] * nums[i];
  }

  console.log(preProduct);
  console.log(suffixProduct);

  // 结果数组
  const res = new Array(nums.length);
  res[0] = suffixProduct[1];
  res[nums.length - 1] = preProduct[nums.length - 2];
  for (let i = 1; i < nums.length - 1; i++) {
    res[i] = preProduct[i - 1] * suffixProduct[i + 1];
  }

  return res;
}

// test
const res = productExceptSelf([1, 2, 3, 4]);
console.log(res);
