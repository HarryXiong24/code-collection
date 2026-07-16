// 373. Find K Pairs with Smallest Sums

// You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.

// Define a pair (u, v) which consists of one element from the first array and one element from the second array.

// Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

// Example 1:
// Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// Output: [[1,2],[1,4],[1,6]]
// Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

// Example 2:
// Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
// Output: [[1,1],[1,1]]
// Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

export function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const queue: number[][] = [];
  const result: number[][] = [];

  for (let i = 0; i < nums1.length; i++) {
    queue.push([nums1[i], nums2[0], 0]);
  }

  let count = 0;
  while (count < k) {
    queue.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

    const min = queue.shift()!;

    result.push([min[0], min[1]]);

    if (min[2] < nums2.length - 1) {
      queue.push([min[0], nums2[min[2] + 1], min[2] + 1]);
    }

    count++;
  }

  return result;
}

// test
const res = kSmallestPairs([1, 7, 11], [2, 4, 6], 3);
console.log(res);
