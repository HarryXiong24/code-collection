// 347. Top K Frequent Elements

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

// Example 2:
// Input: nums = [1], k = 1
// Output: [1]

// It can use bucket sort, and the number of buckets is the number of max value.
// But notice, this can only receive positive integer array. You should do some reflection to cope negative integer if you want to use this method.
export function bucketSort(nums: number[]) {
  const max = Math.max(...nums);
  const min = Math.min(...nums);

  const buckets: number[][] = new Array(max + 1).fill(null).map(() => []);
  const bucketSize = 1;

  for (let item of nums) {
    const index = Math.floor((item - min) / bucketSize);
    buckets[index].push(item);
  }

  const sortedBuckets = buckets.sort((a, b) => b.length - a.length);

  return sortedBuckets;
}

function topKFrequent(nums: number[], k: number): number[] {
  const sortedBuckets = bucketSort(nums);
  const res = sortedBuckets.map((item) => item[0]);
  return res.slice(0, k);
}

// test
const res = topKFrequent([1, 1, 1, 2, 2, 3, 3, 3, 3, 0], 3);
console.log(res);
