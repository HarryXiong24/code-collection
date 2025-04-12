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

// T: O(n)
// S: O(1)
export function productExceptSelf(nums: number[]): number[] {
  let totalProduction: number = 1;
  let existZero: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      totalProduction *= nums[i];
    } else {
      existZero.push(i);
    }
  }

  if (existZero.length === 1) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        nums[i] = 0;
      } else {
        nums[i] = totalProduction;
      }
    }
  } else if (existZero.length > 1) {
    for (let i = 0; i < nums.length; i++) {
      nums[i] = 0;
    }
  } else {
    for (let i = 0; i < nums.length; i++) {
      nums[i] = totalProduction / nums[i];
    }
  }

  return nums;
}

export function productExceptSelfBetter(nums: number[]): number[] {
  const length: number = nums.length;
  let L: number[] = new Array(length).fill(0);
  let R: number[] = new Array(length).fill(0);
  let answer: number[] = new Array(length).fill(0);

  L[0] = 1;
  for (let i = 1; i < length; i++) {
    L[i] = nums[i - 1] * L[i - 1];
  }

  R[length - 1] = 1;
  for (let i = length - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1];
  }

  for (let i = 0; i < length; i++) {
    answer[i] = L[i] * R[i];
  }

  return answer;
}

// test
const res = productExceptSelf([1, 2, 3, 4]); // [24,12,8,6]
const res1 = productExceptSelf([-1, 1, 0, -3, 3]); // [24,12,8,6]
console.log(res);
console.log(res1);
