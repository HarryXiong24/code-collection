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

// BFS
function bfs(grid: string[][], x: number, y: number) {
  const reconcile = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue: number[][] = [];
  queue.push([x, y]);

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      // construct the position of its adjacent node, and then judge whether it is 1, if it is 1, change it to 0
      for (const round of reconcile) {
        let m = current[0] + round[0];
        let n = current[1] + round[1];
        if (m < 0 || m >= grid.length || n < 0 || n >= grid[0].length || grid[m][n] === '0') {
          continue;
        }
        grid[m][n] = '0';
        queue.push([m, n]);
      }
    }
  }
}

// DFS
// construct the position of its adjacent node, and then judge whether it is 1, if it is 1, change it to 0
function dfs(grid: string[][], x: number, y: number) {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] === '0') {
    return;
  }
  // judge whether the current value is 1, if it is 1, change it to 0
  grid[x][y] = '0';
  // recursive
  dfs(grid, x + 1, y);
  dfs(grid, x - 1, y);
  dfs(grid, x, y + 1);
  dfs(grid, x, y - 1);
}

export function numIslands(grid: string[][]): number {
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        // bfs(grid, i, j);
        dfs(grid, i, j);
        res++;
      }
    }
  }
  return res;
}

// test
const grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];
const res = numIslands(grid);
console.log(res);
