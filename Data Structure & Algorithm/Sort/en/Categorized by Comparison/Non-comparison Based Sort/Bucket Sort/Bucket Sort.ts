// Bucket Sort

/**
 * The steps of bucket sort can be broken down into four distinct parts. Given an array A:
 * 1. Create an initial array of k empty buckets.
 * 2. Distribute each element of the array into its respective bucket. A common way to map values to buckets is via the following function: floor(K * A[i] / max(A)).
 * 3. Sort each bucket using insertion sort or some other sorting algorithm.
 * 4. Concatenate the sorted buckets in order to create the sorted list.
 *
 * Time Complexity: O(n^2) - O(N + K), based on the sort algorithm using in each bucket
 * Space Complexity: O(N + K)
 * It is a stable sorting algorithm.
 *
 * Hint: If the array includes negative number, it is not a good choice to use Counting Sort.
 * A key assumption in the above version of counting sort is that the minimum possible value in the array is 0 (no negative numbers) and the maximum value is some positive integer K.
 */

export function bucketSort(nums: number[], K: number): number[] {
  const buckets: number[][] = Array(K)
    .fill(null)
    .map(() => []);

  const min = Math.min(...nums);
  const max = Math.max(...nums) - min;
  const bucketSize = Math.max(1, Math.floor(max / K));

  for (const item of nums) {
    // same as K * nums[i] / max(nums)
    const index = Math.floor((item - min) / bucketSize);

    // edge case for max value
    if (index === K) {
      // put the max value in the last bucket
      buckets[K - 1].push(item);
    } else {
      buckets[index].push(item);
    }
  }

  // sort individual buckets, use insertion sort or some other sorting algorithm
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }

  // convert sorted buckets into final output
  return buckets.flat(2);
}

// test
const array = [23, 25, 21, 12, 19, 17, 5, 7];
const res = bucketSort(array, 5);
console.log(res);
