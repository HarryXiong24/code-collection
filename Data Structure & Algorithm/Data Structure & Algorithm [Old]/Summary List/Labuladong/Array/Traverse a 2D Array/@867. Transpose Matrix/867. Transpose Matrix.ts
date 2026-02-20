// 867. Transpose Matrix

// Given a 2D integer array matrix, return the transpose of matrix.

// The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.

// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[1,4,7],[2,5,8],[3,6,9]]

// Example 2:
// Input: matrix = [[1,2,3],[4,5,6]]
// Output: [[1,4],[2,5],[3,6]]

export function transpose(matrix: number[][]): number[][] {
  const m = matrix.length;
  const n = matrix[0].length;
  const res = new Array(n).fill(0).map(() => new Array(m).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[j][i] = matrix[i][j];
    }
  }

  return res;
}

// test
const res = transpose([
  [1, 2, 3],
  [4, 5, 6],
]);
console.log(res);
