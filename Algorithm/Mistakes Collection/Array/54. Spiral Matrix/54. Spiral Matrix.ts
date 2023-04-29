// 54. Spiral Matrix

// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]

// Example 2:
// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

// 找规律可以发现

// 每一轮 都是从 0,0 1,1, 2,2 ... 开始的，假设每一轮为 turn，每一轮的横纵坐标最大值 x_max，y_max 都为 row - turn - 1，col - turn - 1
// 每一轮遍历
// 从左到右遍历开始（x 不变）， y 递增，到 y <= y_max 时停止
// 此时改为从上到下遍历（y 不变），x，y 从 x+1，x_max 开始，到 x <= x_max 时停止
// 此时改为从右到左遍历（x 不变），x, y 从 x_max， y-- 开始，到 y >= turn 时停止
// 此时改为从下到上遍历（y 不变），x, y 从 x--，turn 开始，到 x > turn 时停止

// Finding patterns can reveal

// Every round starts from 0,0, 1,1, 2,2... At the beginning, assuming each round is a turn, the maximum value x of x-axios(x_max) and the maximum value y of y-axios(y_max) for each round are row - turn - 1，col - turn - 1 respectively.
// Every round of traversal
// Traverse from left to right (x remains unchanged), y increments, stop until y <= y_max.
// At this point, it will be traversed from top to bottom (y remains unchanged), and x, y start from x+1, x_max stop until x <= x_max.
// At this point, it will be traversed from from right to left (x remains unchanged), and x, y start from x_max, y--, stop until y >= turn
// At this point, it be traversed from from bottom to top (y remains unchanged), and x,y start from x--, turn, stop until x > turn

export function spiralOrder(matrix: number[][]): number[] {
  const res: number[] = [];
  const row = matrix.length;
  const col = matrix[0].length;
  const res_length = row * col;

  let turn = 0;
  while (res.length < res_length) {
    const x_max = row - turn - 1;
    const y_max = col - turn - 1;
    let x = turn;
    let y = turn;

    while (y <= y_max) {
      res.push(matrix[x][y]);
      y++;
    }

    y = y_max;
    x++;
    while (y === y_max && x <= x_max) {
      res.push(matrix[x][y]);
      x++;
    }

    x = x_max;
    y--;
    while (y >= turn) {
      res.push(matrix[x][y]);
      y--;
    }

    y = turn;
    x--;
    while (x > turn) {
      res.push(matrix[x][y]);
      x--;
    }

    turn++;
  }

  return res.slice(0, res_length);
}

// res
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const res = spiralOrder(matrix);
console.log(res);
