// 934. Shortest Bridge

// You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

// An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.

// You may change 0's to 1's to connect the two islands to form one island.

// Return the smallest number of 0's you must flip to connect the two islands.

// Example 1:
// Input: grid = [[0,1],[1,0]]
// Output: 1

// Example 2:
// Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
// Output: 2

// Example 3:
// Input: grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
// Output: 1

export function shortestBridge(grid: number[][]): number {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue: number[][] = [];

  const bfs = () => {
    let count = 0;

    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [x, y] = queue.shift()!;
        for (const item of directions) {
          const m = x + item[0];
          const n = y + item[1];
          if (m < 0 || m >= grid.length || n < 0 || n >= grid[0].length) {
            continue;
          }
          if (grid[m][n] === 1) {
            return count;
          }
          if (grid[m][n] === 0) {
            grid[m][n] = 2;
            queue.push([m, n]);
          }
        }
      }
      count++;
    }

    return count;
  };

  const dfs = (i: number, j: number) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return;
    }
    if (grid[i][j] !== 1) {
      return;
    }
    grid[i][j] = 2;
    queue.push([i, j]);
    for (const item of directions) {
      dfs(i + item[0], j + item[1]);
    }
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j);
        return bfs();
      }
    }
  }

  return -1;
}

// test
const res = shortestBridge([
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]);
const res1 = shortestBridge([
  [1, 1, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
]);
const res2 = shortestBridge([
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]);
console.log(res);
console.log(res1);
console.log(res2);
