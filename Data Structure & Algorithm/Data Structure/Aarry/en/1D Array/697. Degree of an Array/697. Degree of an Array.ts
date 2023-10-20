// 697. Degree of an Array

// Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.

// Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.

// Example 1:
// Input: nums = [1,2,2,3,1]
// Output: 2
// Explanation:
// The input array has a degree of 2 because both elements 1 and 2 appear twice.
// Of the subarrays that have the same degree:
// [1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
// The shortest length is 2. So return 2.

// Example 2:
// Input: nums = [1,2,2,3,1,4,2]
// Output: 6
// Explanation:
// The degree is 3 because the element 2 is repeated 3 times.
// So [2,2,3,1,4,2] is the shortest subarray, therefore returning 6.

// Time Complexity: O(n)
export function findShortestSubArray(nums: number[]): number {
  const map: Map<number, number> = new Map();
  let degree = 0;
  let degree_value: number[] = [];

  for (const item of nums) {
    if (map.has(item)) {
      map.set(item, map.get(item)! + 1);
    } else {
      map.set(item, 1);
    }
  }

  for (const value of map.values()) {
    if (value > degree) {
      degree = value;
    }
  }

  for (const [key, value] of map.entries()) {
    if (value === degree) {
      degree_value.push(key);
    }
  }

  let result = nums.length;

  degree_value.forEach((item, index) => {
    const current = nums.lastIndexOf(item) - nums.indexOf(item) + 1;
    if (current < result) {
      result = current;
    }
  });

  return result;
}

// test
const res = findShortestSubArray([1, 2, 2, 3, 1, 4, 2]);
const res1 = findShortestSubArray([1, 2, 2, 3, 1]);
console.log(res);
console.log(res1);
