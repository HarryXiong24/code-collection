// 200. Number of Islands

// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1

// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

export function numIslands(grid: string[][]): number {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let count = 0;

  const BFS = (grid: string[][], i: number, j: number) => {
    const queue: number[][] = [[i, j]];

    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [x, y] = queue.shift()!;
        grid[x][y] = '0';
        for (const item of directions) {
          const m = x + item[0];
          const n = y + item[1];
          if (m < 0 || m >= grid.length || n < 0 || n >= grid[0].length || grid[m][n] === '0') {
            continue;
          }
          queue.push([m, n]);
        }
      }
    }
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        BFS(grid, i, j);
        count++;
      }
    }
  }

  return count;
}

// test
const res = numIslands([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]);
console.log(res);
