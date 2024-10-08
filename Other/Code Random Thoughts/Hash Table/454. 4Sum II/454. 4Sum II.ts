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

export function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  const map = new Map();
  let result: number = 0;

  for (const item1 of nums1) {
    for (const item2 of nums2) {
      if (!map.has(item1 + item2)) {
        map.set(item1 + item2, 0);
      }
      map.set(item1 + item2, map.get(item1 + item2) + 1);
    }
  }

  for (const item3 of nums3) {
    for (const item4 of nums4) {
      const diff = 0 - (item3 + item4);
      if (map.has(diff)) {
        result += map.get(diff);
      }
    }
  }

  return result;
}

// test
const res = fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]);
console.log(res);
