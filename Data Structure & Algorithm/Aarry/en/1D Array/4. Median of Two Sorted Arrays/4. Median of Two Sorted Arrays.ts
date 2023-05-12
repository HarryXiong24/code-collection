// 4. Median of Two Sorted Arrays

// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).

// Example 1:
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

// Example 2:
// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let left = 0;
  let right = nums1.length - 1;
  // take each element in nums2 sequently, applying binary search to find a suitable position and insert it in nums1
  for (let i = 0; i < nums2.length; i++) {
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (nums1[mid] <= nums2[i]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // insert it in nums1
    if (left <= nums1.length) {
      nums1.splice(left, 0, nums2[i]);
    }

    // cause num1 and nums2 are ascending ordered respective, so the next turn can begin at the current left position
    left = left + 1;
    right = nums1.length - 1;
  }

  if (nums1.length % 2 === 0) {
    return (nums1[Math.floor(nums1.length / 2) - 1] + nums1[Math.floor(nums1.length / 2)]) / 2;
  } else {
    return nums1[Math.floor(nums1.length / 2)];
  }
}

// test
const res = findMedianSortedArrays([1, 2, 7, 9], [3, 4, 8]);
console.log(res);
