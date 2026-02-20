// 题目描述

// 给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿指的是由水平或垂直方向上相邻的陆地单元格组成的区域，且完全被水域单元格包围。孤岛是那些位于矩阵内部、所有单元格都不接触边缘的岛屿。

// 现在你需要计算所有孤岛的总面积，岛屿面积的计算方式为组成岛屿的陆地的总数。

// 1 1 0 0 0
// 1 1 0 0 0
// 0 0 1 0 0
// 0 0 0 1 1

// 1

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

export function isolatedAreaOfIsland(grid: number[][]): number {
  const visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
  let area = 0;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i][0] === 1 && !visited[i][0]) {
      dfs(grid, visited, i, 0);
    }
    if (grid[i][grid[i].length - 1] === 1 && !visited[i][grid[i].length - 1]) {
      dfs(grid, visited, i, grid[i].length - 1);
    }
  }

  for (let j = 0; j < grid[0].length; j++) {
    if (grid[0][j] === 1 && !visited[0][j]) {
      dfs(grid, visited, 0, j);
    }
    if (grid[grid.length - 1][j] === 1 && !visited[grid.length - 1][j]) {
      dfs(grid, visited, grid.length - 1, j);
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        area++;
      }
    }
  }

  return area;
}

// test
const res = isolatedAreaOfIsland([
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
