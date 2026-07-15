// 496. Next Greater Element I

// The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

// You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

// For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

// Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

// Example 1:
// Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
// Output: [-1,3,-1]
// Explanation: The next greater element for each value of nums1 is as follows:
// - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
// - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
// - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.

// Example 2:
// Input: nums1 = [2,4], nums2 = [1,2,3,4]
// Output: [3,-1]
// Explanation: The next greater element for each value of nums1 is as follows:
// - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
// - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.

// O(n), monotonic stack
export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const stack: number[] = [];
  const offset: number[] = new Array(nums2.length).fill(0);
  const result: number[] = new Array(nums1.length).fill(-1);
  const map1 = new Map();

  nums1.forEach((value, index) => {
    map1.set(value, index);
  });

  for (let i = 0; i < nums2.length; i++) {
    while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
      const top = stack.pop()!;
      offset[top] = i - top;
    }
    stack.push(i);
  }

  for (let i = 0; i < nums2.length; i++) {
    if (map1.has(nums2[i]) && offset[i] !== 0) {
      const index = map1.get(nums2[i]);
      result[index] = nums2[i + offset[i]];
    }
  }

  return result;
}

// test
const res = nextGreaterElement([4, 1, 2], [1, 3, 4, 2]);
console.log(res);
