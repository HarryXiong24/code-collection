// 88. Merge Sorted Array

// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

// Merge nums1 and nums2 into a single array sorted in non-decreasing order.

// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

// Example 1:
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

// Example 2:
// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
// The result of the merge is [1].

// Example 3:
// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
// The result of the merge is [1].
// Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

/**
 Do not return anything, modify nums1 in-place instead.
 */
// Time Complexity: O(n)
// Space Complexity: O(1)
export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let len1 = m - 1;
  let len2 = n - 1;

  for (let i = n + m - 1; i >= 0 && len2 >= 0; i--) {
    const num1 = nums1[len1];
    const num2 = nums2[len2];

    if (len1 >= 0 && num1 > num2) {
      nums1[i] = num1;
      len1--;
    } else {
      nums1[i] = num2;
      len2--;
    }
  }
}

// test
const res = merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
console.log(res);
