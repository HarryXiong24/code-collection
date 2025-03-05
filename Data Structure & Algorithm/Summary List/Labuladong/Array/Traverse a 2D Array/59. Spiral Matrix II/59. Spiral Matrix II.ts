// 59. Spiral Matrix II

// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

// Example 1:
// Input: n = 3
// Output: [[1,2,3],[8,9,4],[7,6,5]]

// Example 2:Tra
// Input: n = 1
// Output: [[1]]

export function generateMatrix(n: number): number[][] {
  const res: number[][] = new Array(n).fill([]).map(() => new Array(n).fill(0));

  let num = 1;
  let bound = 0;

  while (num <= n * n) {
    for (let j = bound; j < n - bound; j++) {
      res[bound][j] = num;
      num++;
    }

    for (let i = bound + 1; i < n - bound; i++) {
      res[i][n - 1 - bound] = num;
      num++;
    }

    for (let j = n - 1 - bound - 1; j >= bound; j--) {
      res[n - 1 - bound][j] = num;
      num++;
    }

    for (let i = n - 1 - bound - 1; i > bound; i--) {
      res[i][bound] = num;
      num++;
    }

    bound++;
  }

  return res;
}

// test
const res = generateMatrix(4);
console.log(res);
