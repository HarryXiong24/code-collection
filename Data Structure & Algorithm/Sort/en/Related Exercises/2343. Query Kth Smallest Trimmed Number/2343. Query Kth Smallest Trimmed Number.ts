// 2343. Query Kth Smallest Trimmed Number

// You are given a 0-indexed array of strings nums, where each string is of equal length and consists of only digits.
// You are also given a 0-indexed 2D integer array queries where queries[i] = [ki, trimi]. For each queries[i], you need to:

// Trim each number in nums to its rightmost trimi digits.
// Determine the index of the kith smallest trimmed number in nums. If two trimmed numbers are equal, the number with the lower index is considered to be smaller.
// Reset each number in nums to its original length.
// Return an array answer of the same length as queries, where answer[i] is the answer to the ith query.

// Note:
// To trim to the rightmost x digits means to keep removing the leftmost digit, until only x digits remain.
// Strings in nums may contain leading zeros.

// Example 1:
// Input: nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
// Output: [2,2,1,0]
// Explanation:
// 1. After trimming to the last digit, nums = ["2","3","1","4"]. The smallest number is 1 at index 2.
// 2. Trimmed to the last 3 digits, nums is unchanged. The 2nd smallest number is 251 at index 2.
// 3. Trimmed to the last 2 digits, nums = ["02","73","51","14"]. The 4th smallest number is 73.
// 4. Trimmed to the last 2 digits, the smallest number is 2 at index 0.
//    Note that the trimmed number "02" is evaluated as 2.

//    Example 2:
// Input: nums = ["24","37","96","04"], queries = [[2,1],[2,2]]
// Output: [3,0]
// Explanation:
// 1. Trimmed to the last digit, nums = ["4","7","6","4"]. The 2nd smallest number is 4 at index 3.
//    There are two occurrences of 4, but the one at index 0 is considered smaller than the one at index 3.
// 2. Trimmed to the last 2 digits, nums is unchanged. The 2nd smallest number is 24.

export function smallestTrimmedNumbers(nums: string[], queries: number[][]): number[] {
  const N = nums.length;
  const M = nums[0].length;
  const trimMap = new Map<number, string[]>();

  // Create matrix with leading index of original order in nums
  let matrix: string[][] = [];
  for (let i = 0; i < nums.length; i++) {
    matrix.push([i.toString(), ...nums[i].split('')]);
  }

  const getDigit = (char: string): number => char.charCodeAt(0) - '0'.charCodeAt(0);

  // Count sort for radix column in the matrix
  const countSort = (radix: number): void => {
    const counts = new Array(10).fill(0).map(() => new Array());
    for (let i = 0; i < N; i++) {
      const j = M - radix + 1;
      counts[getDigit(matrix[i][j])].push(matrix[i].concat());
    }

    matrix = [];
    let indexes = [];
    for (let count of counts) {
      while (count.length) {
        const row = count.shift();
        matrix.push(row);
        indexes.push(row[0]);
      }
    }
    trimMap.set(radix, indexes.concat());
  };

  // Go through the queries and perform radix sort (counting sort iteration) if needed
  const result = [];
  let minTrim = 1;
  for (const [k, trim] of queries) {
    if (!trimMap.has(trim)) {
      for (let i = minTrim; i <= trim; i++) {
        countSort(i);
      }
      minTrim = trim + 1;
    }
    result.push(trimMap.get(trim)![k - 1]);
  }

  return result.map((item) => parseInt(item));
}

// test
const res = smallestTrimmedNumbers(
  ['102', '473', '251', '814'],
  [
    [1, 1],
    [2, 3],
    [4, 2],
    [1, 2],
  ]
);
console.log(res);
