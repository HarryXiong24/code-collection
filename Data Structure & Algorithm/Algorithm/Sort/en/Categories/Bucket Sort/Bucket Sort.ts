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
 * Hint: If the array includes negative number, you should use it carefully.
 * A key assumption in the above version of counting sort is that the minimum possible value in the array is 0 (no negative numbers) and the maximum value is some positive integer K.
 */

export function bucketSort(nums: number[], bucket_number: number): void {
  // mapping
  const min = Math.min(...nums);
  const mapper = min < 0 ? Math.abs(0 - min) : 0;

  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + mapper;
  }

  // create bucket
  const max = Math.max(...nums);
  const buckets: number[][] = new Array(bucket_number).fill(null).map(() => []);
  const bucketSize = Math.floor((max - min) / bucket_number);

  // put elements into buckets
  for (const item of nums) {
    const index = Math.floor((item - min) / bucketSize);

    if (index >= bucket_number) {
      // handle boundary condition
      buckets[bucket_number - 1].push(item);
    } else {
      buckets[index].push(item);
    }
  }

  // sort for elements in every bucket
  // and you can use any of the sorting methods
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }

  // Concatenate the sorted buckets in order to create the sorted list.
  const sortedArray = buckets.flat();

  // remapping
  for (let i = 0; i < nums.length; i++) {
    nums[i] = sortedArray[i] - mapper;
  }
}

// test
const array = [23, 25, 21, 12, 19, 17, 5, 7];
bucketSort(array, 5);
console.log(array);
