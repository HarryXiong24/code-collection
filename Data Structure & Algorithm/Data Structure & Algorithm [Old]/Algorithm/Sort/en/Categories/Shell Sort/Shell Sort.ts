// Shell Sort

/**
 * Firstly, we divide the entire record sequence to be sorted into several subsequences for direct insertion sorting respectively.
 * The specific algorithm description:
 * 1. Choose an incremental sequence t1, t2, ..., tk, where ti>tj, tk=1;
 * 2. According to the incremental sequence number k, sort the sequence k times;
 * 3. For each sorting, according to the corresponding increment ti, the column to be sorted is divided into several subsequences of length m, and direct insertion sorting is performed on each sub-list respectively.
 * 4. Only when the increment factor is 1, the entire sequence is treated as a table, and the length of the table is the length of the entire sequence.
 *
 * Time Complexity: O(n * log n)
 * Space Complexity: O(1)
 * It is a not stable sorting algorithm.
 */

export function shellSort(nums: number[]): number[] {
  let gap = Math.floor(nums.length / 2);

  while (gap > 0) {
    for (let i = gap; i < nums.length; i++) {
      const temp = nums[i];
      let j = i;
      while (j >= gap && nums[j - gap] > temp) {
        nums[j] = nums[j - gap];
        j -= gap;
      }
      nums[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return nums;
}

// test
const res = shellSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
