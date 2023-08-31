// 1020. Number of Enclaves

// You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

// A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

// Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

// Example 1:
// Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
// Output: 3
// Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.

// Example 2:
// Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
// Output: 0
// Explanation: All 1s are either on the boundary or can reach the boundary.

export function numEnclaves(grid: number[][]): number {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let result: number = 0;
  let flag = true;

  const recursive = (i: number, j: number, count: string[]) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return;
    }
    if (grid[i][j] === 0) {
      return;
    }
    if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[0].length - 1) {
      flag = false;
      return;
    }
    count.push(`row${i}-col${j}`);
    grid[i][j] = 0;
    for (const item of directions) {
      recursive(i + item[0], j + item[1], count);
    }
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        const count: string[] = [];
        flag = true;
        recursive(i, j, count);
        if (flag === true) {
          result = result + count.length;
        }
      }
    }
  }

  return result;
}

// test
const res = numEnclaves([
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
]);
console.log(res);
