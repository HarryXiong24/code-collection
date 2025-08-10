// 1254. Number of Closed Islands

// Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

// Return the number of closed islands.

// Example 1:
// Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
// Output: 2
// Explanation:
// Islands in gray are closed because they are completely surrounded by water (group of 1s).

// Example 2:
// Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
// Output: 1

// Example 3:
// Input: grid = [[1,1,1,1,1,1,1],
//                [1,0,0,0,0,0,1],
//                [1,0,1,1,1,0,1],
//                [1,0,1,0,1,0,1],
//                [1,0,1,1,1,0,1],
//                [1,0,0,0,0,0,1],
//                [1,1,1,1,1,1,1]]
// Output: 2

function bfs(grid: number[][], visited: boolean[][], x: number, y: number) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  visited[x][y] = true;
  const queue: number[][] = [[x, y]];

  while (queue.length) {
    const [current_x, current_y] = queue.shift()!;
    visited[current_x][current_y] = true;

    for (const direction of directions) {
      const next_x = current_x + direction[0];
      const next_y = current_y + direction[1];

      if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
        if (!visited[next_x][next_y] && grid[next_x][next_y] === 0) {
          visited[next_x][next_y] = true;
          queue.push([next_x, next_y]);
        }
      }
    }
  }
}

export function closedIsland(grid: number[][]): number {
  const visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));

  for (let i = 0; i < grid.length; i++) {
    if (grid[i][0] === 0 && !visited[i][0]) {
      bfs(grid, visited, i, 0);
    }
    if (grid[i][grid[i].length - 1] === 0 && !visited[i][grid[i].length - 1]) {
      bfs(grid, visited, i, grid[i].length - 1);
    }
  }

  for (let j = 0; j < grid[0].length; j++) {
    if (grid[0][j] === 0 && !visited[0][j]) {
      bfs(grid, visited, 0, j);
    }
    if (grid[grid.length - 1][j] === 0 && !visited[grid.length - 1][j]) {
      bfs(grid, visited, grid.length - 1, j);
    }
  }

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === 0) {
        count++;
        bfs(grid, visited, i, j);
      }
    }
  }

  return count;
}

// test
const res = closedIsland([
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
]);
console.log(res);
