// 350. Intersection of Two Arrays II

// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

// Example 1:
// Input: nums1 = [1,2,2,1], nums2 = [2,2]
// Output: [2,2]

// Example 2:
// Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// Output: [4,9]
// Explanation: [9,4] is also accepted.

export function intersect(nums1: number[], nums2: number[]): number[] {
  const res: number[] = [];
  // first need to find the long one and the last one
  const [long, short] = nums1.length > nums2.length ? [nums1, nums2] : [nums2, nums1];

  for (let i = 0; i < short.length; i++) {
    const turn = short[i];
    // select elements from short one sequently, and put it into the long one to compare, if find it in long one, add it to res and delete it in the long one
    for (let j = 0; j < long.length; j++) {
      if (long[j] === turn) {
        res.push(long[j]);
        long.splice(j, 1);
        break;
      }
    }
  }

  return res;
}

// test
const res = intersect([1, 2, 2, 1], [2, 2]);
console.log(res);
