// 417. Pacific Atlantic Water Flow

// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

// The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

// Example 1:
// Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
// Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
// [0,4]: [0,4] -> Pacific Ocean
//        [0,4] -> Atlantic Ocean
// [1,3]: [1,3] -> [0,3] -> Pacific Ocean
//        [1,3] -> [1,4] -> Atlantic Ocean
// [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
//        [1,4] -> Atlantic Ocean
// [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
//        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
// [3,0]: [3,0] -> Pacific Ocean
//        [3,0] -> [4,0] -> Atlantic Ocean
// [3,1]: [3,1] -> [3,0] -> Pacific Ocean
//        [3,1] -> [4,1] -> Atlantic Ocean
// [4,0]: [4,0] -> Pacific Ocean
//        [4,0] -> Atlantic Ocean
// Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

// Example 2:
// Input: heights = [[1]]
// Output: [[0,0]]
// Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

function dfs(grid: number[][], visited: boolean[][], x: number, y: number) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  visited[x][y] = true;

  for (const direction of directions) {
    const next_x = x + direction[0];
    const next_y = y + direction[1];

    if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
      if (!visited[next_x][next_y] && grid[next_x][next_y] >= grid[x][y]) {
        visited[next_x][next_y] = true;
        dfs(grid, visited, next_x, next_y);
      }
    }
  }
}

export function pacificAtlantic(heights: number[][]): number[][] {
  const pacificBorder: boolean[][] = new Array(heights.length)
    .fill(false)
    .map(() => new Array(heights[0].length).fill(false));
  const atlanticBorder: boolean[][] = new Array(heights.length)
    .fill(false)
    .map(() => new Array(heights[0].length).fill(false));

  for (let i = 0; i < heights.length; i++) {
    if (!pacificBorder[i][0]) {
      dfs(heights, pacificBorder, i, 0);
    }
    if (!atlanticBorder[i][heights[i].length - 1]) {
      dfs(heights, atlanticBorder, i, heights[i].length - 1);
    }
  }

  for (let j = 0; j < heights[0].length; j++) {
    if (!pacificBorder[0][j]) {
      dfs(heights, pacificBorder, 0, j);
    }
    if (!atlanticBorder[heights.length - 1][j]) {
      dfs(heights, atlanticBorder, heights.length - 1, j);
    }
  }

  const result: number[][] = [];

  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[i].length; j++) {
      if (pacificBorder[i][j] && atlanticBorder[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
}

// test
const res = pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]);
console.log(res);
