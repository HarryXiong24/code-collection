// 01.08 零矩阵

/*
 * 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零
 * 输入：
 * [
 *  [1,1,1],
 *  [1,0,1],
 *  [1,1,1]
 * ]
 * 输出：
 * [
 *  [1,0,1],
 *  [0,0,0],
 *  [1,0,1]
 * ]
 */

/**
 Do not return anything, modify matrix in-place instead.
 */
export function setZeroes(matrix: number[][]): void {
  let record_i: Set<number> = new Set<number>();
  let record_j: Set<number> = new Set<number>();

  // 记录一下为 0 的 i, j 信息
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        record_i.add(i);
        record_j.add(j);
      }
    }
  }

  // i, j 出现过的行列，全部清零
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (record_i.has(i) || record_j.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
}

// test
let arr: number[][] = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];
setZeroes(arr);
console.log(arr);
