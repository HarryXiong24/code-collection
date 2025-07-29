// 827. Making A Large Island

// You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

// Return the size of the largest island in grid after applying this operation.

// An island is a 4-directionally connected group of 1s.

// Example 1:
// Input: grid = [[1,0],[0,1]]
// Output: 3
// Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.

// Example 2:
// Input: grid = [[1,1],[1,0]]
// Output: 4
// Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.

// Example 3:
// Input: grid = [[1,1],[1,1]]
// Output: 4
// Explanation: Can't change any 0 to 1, only one island with area = 4.

function dfs(grid: number[][], visited: boolean[][], x: number, y: number, mark: number) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let area = 1;
  visited[x][y] = true;
  grid[x][y] = mark;

  for (const direction of directions) {
    const next_x = x + direction[0];
    const next_y = y + direction[1];

    if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
      if (!visited[next_x][next_y] && grid[next_x][next_y] === 1) {
        visited[next_x][next_y] = true;
        grid[next_x][next_y] = mark;
        area += dfs(grid, visited, next_x, next_y, mark);
      }
    }
  }

  return area;
}

export function largestIsland(grid: number[][]): number {
  const visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
  let mark = 2; // 标记岛屿
  const map: Map<number, number> = new Map();
  let maxArea: number = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        const area = dfs(grid, visited, i, j, mark);
        map.set(mark, area);
        mark++;
      }
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        const seen = new Set<number>();
        let area = 1;
        for (const direction of directions) {
          const next_x = i + direction[0];
          const next_y = j + direction[1];

          if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
            if (map.has(grid[next_x][next_y]) && !seen.has(grid[next_x][next_y])) {
              seen.add(grid[next_x][next_y]);
              area += map.get(grid[next_x][next_y])!;
            }
          }
        }
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea === 0 ? grid.length * grid[0].length : maxArea;
}

// test
const res = largestIsland([
  [1, 1],
  [0, 1],
]);
console.log(res);
