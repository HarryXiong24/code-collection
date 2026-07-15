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
// Output:

const bfs = (grid: string[][], visited: boolean[][], x: number, y: number) => {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue: number[][] = [];

  queue.push([x, y]);
  visited[x][y] = true;

  while (queue.length) {
    const [current_x, current_y] = queue.shift()!;

    for (const direction of directions) {
      const next_x = current_x + direction[0];
      const next_y = current_y + direction[1];
      if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
        if (!visited[next_x][next_y] && grid[next_x][next_y] === '1') {
          queue.push([next_x, next_y]);
          visited[next_x][next_y] = true;
        }
      }
    }
  }
};

export function numIslands(grid: string[][]): number {
  let result: number = 0;
  const visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j] && grid[i][j] === '1') {
        result++;
        bfs(grid, visited, i, j);
      }
    }
  }

  return result;
}

// test
const res = numIslands([
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]);
console.log(res);
