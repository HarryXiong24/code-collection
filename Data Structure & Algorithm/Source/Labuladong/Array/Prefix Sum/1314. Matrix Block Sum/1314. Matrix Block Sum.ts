// 1314. Matrix Block Sum

// Given a m x n matrix mat and an integer k, return a matrix answer where each answer[i][j] is the sum of all elements mat[r][c] for:

// i - k <= r <= i + k,
// j - k <= c <= j + k, and
// (r, c) is a valid position in the matrix.

// Example 1:
// Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
// Output: [[12,21,16],[27,45,33],[24,39,28]]

// Example 2:
// Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
// Output: [[45,45,45],[45,45,45],[45,45,45]]

class NumMatrix {
  preSum: number[][];

  constructor(matrix: number[][]) {
    const m = matrix.length;
    const n = matrix[0].length;

    // preSum[i][j] 记录矩阵 [0, 0, i-1, j-1] 的元素和
    this.preSum = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    if (m == 0 || n == 0) {
      return;
    }

    // 构造前缀和矩阵
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        // 计算每个矩阵 [0, 0, i, j] 的元素和
        this.preSum[i][j] =
          this.preSum[i - 1][j] + this.preSum[i][j - 1] + matrix[i - 1][j - 1] - this.preSum[i - 1][j - 1];
      }
    }

    console.log(this.preSum);
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    // 计算子矩阵 [x1, y1, x2, y2] 的元素和
    // 目标矩阵之和由四个相邻矩阵运算获得
    return (
      this.preSum[row2 + 1][col2 + 1] -
      this.preSum[row1][col2 + 1] -
      this.preSum[row2 + 1][col1] +
      this.preSum[row1][col1]
    );
  }
}

export function matrixBlockSum(mat: number[][], k: number): number[][] {
  const m = mat.length;
  const n = mat[0].length;
  const numMatrix = new NumMatrix(mat);
  const res = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 左上角的坐标
      const x1 = Math.max(i - k, 0);
      const y1 = Math.max(j - k, 0);
      // 右下角坐标
      const x2 = Math.min(i + k, m - 1);
      const y2 = Math.min(j + k, n - 1);
      res[i][j] = numMatrix.sumRegion(x1, y1, x2, y2);
    }
  }
  return res;
}
