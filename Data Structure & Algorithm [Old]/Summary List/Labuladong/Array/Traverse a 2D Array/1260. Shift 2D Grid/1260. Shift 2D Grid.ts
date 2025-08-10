// 1260. Shift 2D Grid

// Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.

// In one shift operation:

// Element at grid[i][j] moves to grid[i][j + 1].
// Element at grid[i][n - 1] moves to grid[i + 1][0].
// Element at grid[m - 1][n - 1] moves to grid[0][0].
// Return the 2D grid after applying shift operation k times.

// Example 1:
// Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
// Output: [[9,1,2],[3,4,5],[6,7,8]]

// Example 2:
// Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
// Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]

// Example 3:
// Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
// Output: [[1,2,3],[4,5,6],[7,8,9]]

export function shiftGrid(grid: number[][], k: number): number[][] {
  const shift = (grid: number[][]) => {
    let shiftNum: number = grid[grid.length - 1][grid[grid.length - 1].length - 1];

    for (let i = 0; i < grid.length; i++) {
      const lastEle = grid[i][grid[i].length - 1];
      for (let j = grid[i].length - 1; j > 0; j--) {
        grid[i][j] = grid[i][j - 1];
      }
      grid[i][0] = shiftNum;
      shiftNum = lastEle;
    }
  };

  while (k > 0) {
    shift(grid);
    k--;
  }

  return grid;
}

// test
const res = shiftGrid(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  1
);
console.log(res);
