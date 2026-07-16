// 779. K-th Symbol in Grammar

// We build a table of n rows (1-indexed). We start by writing 0 in the 1st row.
// Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.

// For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
// Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.

// Example 1:
// Input: n = 1, k = 1
// Output: 0
// Explanation: row 1: 0

// Example 2:
// Input: n = 2, k = 1
// Output: 0
// Explanation:
// row 1: 0
// row 2: 01

// Example 3:
// Input: n = 2, k = 2
// Output: 1
// Explanation:
// row 1: 0
// row 2: 01

// right, but will overflow
export function kthGrammar(n: number, k: number): number {
  const rows: string[] = ['0'];

  const recursive = (count: number, current: string) => {
    if (count > n) {
      return;
    }

    const temp = current;
    current = '';
    for (let item of temp) {
      if (item === '0') {
        current += '01';
      }
      if (item === '1') {
        current += '10';
      }
    }
    rows[0] = current;

    recursive(count + 1, current);
  };

  recursive(2, '0');

  return Number(rows[rows.length - 1][k - 1]);
}

// Often to solve the problem you should do some basic examples on the paper and notice some dependencies
// n=1: 0
// n=2: 01
// n=3: 0110
// n=4: 01101001

// You can see that the each level repeat the previous one in the first half. And the second half is like inversed first part... so we can make a recursive solution based on that
// n=1: 0
// n=2: 0 - 1
// n=3: 01 - 10
// n=4: 0110 - 1001
export function kthGrammar1(n: number, k: number): number {
  // base case
  if (k === 1) {
    return 0;
  }

  // find the middle of the n-level
  let middle = Math.pow(2, n - 1) / 2;

  // if k in the left side, we can calculate the same but for n - 1
  if (k <= middle) {
    return kthGrammar(n - 1, k);
  }

  // if k in the right side, we can modify this case
  return kthGrammar(n - 1, k - middle) === 1 ? 0 : 1;
}

// test
const res = kthGrammar1(4, 6);
console.log(res);
