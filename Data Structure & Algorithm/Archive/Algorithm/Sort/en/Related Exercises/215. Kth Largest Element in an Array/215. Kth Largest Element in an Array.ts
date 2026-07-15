// 215. Kth Largest Element in an Array

// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

// Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5

// Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

function bucketSort(nums: number[], k: number): number[] {
  const originalMin = Math.min(...nums);

  let reflect = 0;
  if (originalMin < 0) {
    reflect = Math.abs(0 - originalMin);
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + reflect;
  }

  const min = Math.min(...nums);
  const gap = Math.max(...nums) - min;
  const buckets: number[][] = new Array(k).fill(null).map(() => []);
  const bucketSize = Math.max(1, Math.floor(gap / k));

  for (const item of nums) {
    const index = Math.floor((item - min) / bucketSize);

    if (index >= k) {
      buckets[k - 1].push(item);
    } else {
      buckets[index].push(item);
    }
  }

  for (let bucket of buckets) {
    bucket = bucket.sort((a, b) => a - b);
  }

  const res = buckets.flat(2);

  for (let i = 0; i < res.length; i++) {
    res[i] = res[i] - reflect;
  }

  return res;
}

export function findKthLargest(nums: number[], k: number): number {
  const res = bucketSort(nums, 5);
  return res[res.length - k];
}

// test
const res = findKthLargest([-1, 3, 2, 1, 5, 6, 4], 2);
console.log(res);
