// 454. 4Sum II

// Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that:
// 0 <= i, j, k, l < n
// nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

// Example 1:
// Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
// Output: 2
// Explanation:
// The two tuples are:
// 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0

// Example 2:
// Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
// Output: 1

// Use map to decrease the time complexity, and it will be n^4 originally, but now it's O(n^2)
// Time Complexity: O(2n^2)
// Space Complexity: O(n)
export function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  const map12 = new Map<number, number>();
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const sum = nums1[i] + nums2[j];
      if (map12.has(sum)) {
        const current = map12.get(sum)!;
        map12.set(sum, current + 1);
      } else {
        map12.set(sum, 1);
      }
    }
  }

  let res = 0;
  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const target = 0 - (nums3[i] + nums4[j]);
      if (map12.has(target)) {
        res = res + map12.get(target)!;
      }
    }
  }

  return res;
}

// test
const nums1 = [1, 2];
const nums2 = [-2, -1];
const nums3 = [-1, 2];
const nums4 = [0, 2];
const res = fourSumCount(nums1, nums2, nums3, nums4);
console.log(res);
