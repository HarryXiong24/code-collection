// 59. Spiral Matrix II

// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

// Example 1:
// Input: n = 3
// Output: [[1,2,3],[8,9,4],[7,6,5]]

// Example 2:
// Input: n = 1
// Output: [[1]]

export function generateMatrix(n: number): number[][] {
  let start_x = 0;
  let start_y = 0;
  let offset = 1;
  let loop = Math.floor(n / 2);

  const result: number[][] = [...new Array(n)].map(() => new Array(n).fill(0));
  let count = 1;

  while (loop) {
    for (let j = start_y; j < n - offset; j++) {
      result[start_x][j] = count;
      count++;
    }

    for (let i = start_x; i < n - offset; i++) {
      result[i][n - offset] = count;
      count++;
    }

    for (let j = n - offset; j > start_y; j--) {
      result[n - offset][j] = count;
      count++;
    }

    for (let i = n - offset; i > start_x; i--) {
      result[i][start_y] = count;
      count++;
    }

    start_x++;
    start_y++;
    offset++;
    loop--;
  }

  if (n % 2 === 1) {
    result[start_x][start_y] = count;
  }

  return result;
}

// test
const res = generateMatrix(3);
console.log(res);
