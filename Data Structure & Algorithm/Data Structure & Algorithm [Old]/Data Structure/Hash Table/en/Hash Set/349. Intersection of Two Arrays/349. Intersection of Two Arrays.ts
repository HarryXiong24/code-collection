// 349. Intersection of Two Arrays

// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

// Example 1:
// Input: nums1 = [1,2,2,1], nums2 = [2,2]
// Output: [2]

// Example 2:
// Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// Output: [9,4]
// Explanation: [4,9] is also accepted.

export function intersection(nums1: number[], nums2: number[]): number[] {
  const res: number[] = [];
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  for (let val of set1) {
    if (set2.has(val)) {
      res.push(val);
    }
  }

  return res;
}

// test
const res = intersection([4, 9, 5], [9, 4, 9, 8, 4]);
console.log(res);
