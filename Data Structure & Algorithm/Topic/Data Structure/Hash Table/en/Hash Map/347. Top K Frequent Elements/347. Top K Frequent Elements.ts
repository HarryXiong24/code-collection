// 347. Top K Frequent Elements

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

// Example 2:
// Input: nums = [1], k = 1
// Output: [1]

export function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>();

  for (let item of nums) {
    if (map.has(item)) {
      const current_count = map.get(item)!;
      map.set(item, current_count + 1);
    } else {
      map.set(item, 1);
    }
  }

  const res = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, k);

  return res.map((item) => item[0]);
}

// test
const res = topKFrequent([1, 1, 1, 2, 2, 3], 2);
console.log(res);
