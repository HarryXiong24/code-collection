// 695. Max Area of Island

// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

// The area of an island is the number of cells with a value 1 in the island.

// Return the maximum area of an island in grid. If there is no island, return 0.

// Example 1:
// Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// Output: 6
// Explanation: The answer is not 11, because the island must be connected 4-directionally.

// Example 2:
// Input: grid = [[0,0,0,0,0,0,0,0]]
// Output: 0

function dfs(grid: number[][], visited: boolean[][], x: number, y: number): number {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let area = 1;
  visited[x][y] = true;

  for (const direction of directions) {
    const next_x = x + direction[0];
    const next_y = y + direction[1];

    if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
      if (!visited[next_x][next_y] && grid[next_x][next_y] === 1) {
        visited[next_x][next_y] = true;
        area += dfs(grid, visited, next_x, next_y);
      }
    }
  }

  return area;
}

function bfs(grid: number[][], visited: boolean[][], x: number, y: number) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let area = 1;
  visited[x][y] = true;
  const queue: number[][] = [[x, y]];

  while (queue.length) {
    const [current_x, current_y] = queue.shift()!;
    visited[current_x][current_y] = true;

    for (const direction of directions) {
      const next_x = current_x + direction[0];
      const next_y = current_y + direction[1];

      if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
        if (!visited[next_x][next_y] && grid[next_x][next_y] === 1) {
          visited[next_x][next_y] = true;
          queue.push([next_x, next_y]);
          area += 1;
        }
      }
    }
  }

  return area;
}

export function maxAreaOfIsland(grid: number[][]): number {
  const visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
  let maxArea: number = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        // const area = dfs(grid, visited, i, j);
        const area = bfs(grid, visited, i, j);
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;
}

// test
const res = maxAreaOfIsland([
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
]);
console.log(res);
