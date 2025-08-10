// 498. Diagonal Traverse

// Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

// Example 1:
// Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,4,7,5,3,6,8,9]

// Example 2:
// Input: mat = [[1,2],[3,4]]
// Output: [1,2,3,4]

// 一共有 m+n-1 条对角线，相邻的对角线的遍历方向不同，当前遍历方向为从左下到右上，则紧挨着的下一条对角线遍历方向为从右上到左下；

// 设对角线从上到下的编号为 i∈[0,m+n−2]：
// 当 i 为偶数时，则第 i 条对角线的走向是从下往上遍历；
// 当 i 为奇数时，则第 i 条对角线的走向是从上往下遍历；

// 当第 i 条对角线从下往上遍历时，每次行索引减 1, 列索引加 1，直到矩阵的边缘为止：
// 当 i<m 时，则此时对角线遍历的起点位置为 (i,0)；
// 当 i≥m 时，则此时对角线遍历的起点位置为 (m−1,i−m+1)；

// 当第 i 条对角线从上往下遍历时，每次行索引加 1，列索引减 1，直到矩阵的边缘为止：
// 当 i<n 时，则此时对角线遍历的起点位置为 (0,i)；
// 当 i≥n 时，则此时对角线遍历的起点位置为 (i−n+1,n−1)；

// There are a total of m+n-1 diagonal lines, and the traversal direction of adjacent diagonal lines is different. If the current traversal direction is from bottom left to top right, the traversal direction of the next diagonal line is from top right to bottom left;

// Let the diagonal number i ∈ [0, m+n − 2] from top to bottom:

// When i is an even number, the direction of the i-th diagonal is traversed from bottom to top;
// When i is an odd number, the direction of the i-th diagonal is traversed from top to bottom;

// When traversing the i-th diagonal from bottom to top, subtract 1 from the row index and 1 from the column index each time, until the edge of the matrix is reached:
// When i < m, the starting position of the diagonal traversal is (i, 0);
// When i ≥ m, the starting position of the diagonal traversal is (m-1, i-m+1);

// When the i-th diagonal is traversed from top to bottom, the row index increases by 1 and the column index decreases by 1 until the edge of the matrix is reached:
// When i < n, the starting position of the diagonal traversal is (0, i);
// When i ≥ n, the starting position of the diagonal traversal is (i-n+1, n-1);

export function findDiagonalOrder(mat: number[][]): number[] {
  const row = mat.length;
  const col = mat[0].length;
  const res: number[] = [];
  let pos = 0;
  for (let i = 0; i < row + col - 1; i++) {
    if (i % 2 === 0) {
      let x = i < row ? i : row - 1;
      let y = i < row ? 0 : i - row + 1;
      while (x >= 0 && y < col) {
        res[pos] = mat[x][y];
        pos++;
        x--;
        y++;
      }
    } else {
      let x = i < col ? 0 : i - col + 1;
      let y = i < col ? i : col - 1;
      while (x < row && y >= 0) {
        res[pos] = mat[x][y];
        pos++;
        x++;
        y--;
      }
    }
  }
  return res;
}

export function findDiagonalOrder1(mat: number[][]): number[] {
  const row = mat.length;
  const col = mat[0].length;
  const res: number[][] = [];
  for (let i = 0; i < row + col - 1; i++) {
    const temp: number[] = [];
    let x = i < row ? i : row - 1;
    let y = i < row ? 0 : i - row + 1;
    while (x >= 0 && y < col) {
      temp.push(mat[x][y]);
      x--;
      y++;
    }

    if (i % 2 === 1) {
      temp.reverse();
    }
    res.push(temp);
  }
  return res.flat();
}

// test
const res = findDiagonalOrder1([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
console.log(res);
