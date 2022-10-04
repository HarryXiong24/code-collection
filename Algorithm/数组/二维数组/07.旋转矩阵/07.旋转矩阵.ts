// 07 旋转矩阵

/**
 * 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节
 * 请你设计一种算法，将图像旋转 90 度
 * 给定 matrix =
 * [
 *  [1,2,3],
 *  [4,5,6],
 *  [7,8,9]
 * ],
 * 原地旋转输入矩阵，使其变为:
 * [
 *  [7,4,1],
 *  [8,5,2],
 *  [9,6,3]
 * ]
 */

// 其实就是先水平翻转， 然后主对角线翻转
// Do not return anything, modify matrix in-place instead.
export function rotate(matrix: number[][]): void {
  const n = matrix.length;
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
    }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
}

// test
const arr: number[][] = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];
rotate(arr);
console.log(arr);
