// 11. Shortest Cell Path

// In a given grid of 0s and 1s, we have some starting row and column sr, sc and a target row and column tr, tc. Return the length of the shortest path from sr, sc to tr, tc that walks along 1 values only.

// Each location in the path, including the start and the end, must be a 1. Each subsequent location in the path must be 4-directionally adjacent to the previous location.

// It is guaranteed that grid[sr][sc] = grid[tr][tc] = 1, and the starting and target positions are different.

// If the task is impossible, return -1.

// Examples:

// input:
// grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]]
// sr = 0, sc = 0, tr = 2, tc = 0
// output: 8
// (The lines below represent this grid:)
// 1111
// 0001
// 1111

// input:
// grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 0, 1, 1]]
// sr = 0, sc = 0, tr = 2, tc = 0
// output: -1
// (The lines below represent this grid:)
// 1111
// 0001
// 1011

/**
	@param grid: integer[][]
	@param sr: integer
	@param sc: integer
	@param tr: integer
	@param tc: integer
	@return: integer
	*/
export function shortestCellPath(grid: number[][], sr: number, sc: number, tr: number, tc: number): number {
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue: [number, number, number][] = [[sr, sc, 0]];
  // start
  grid[sr][sc] = 0;

  while (queue.length) {
    const [current_x, current_y, current_step] = queue.shift()!;

    if (current_x === tr && current_y === tc) {
      return current_step;
    }

    grid[current_x][current_y] = 0;

    for (const item of direction) {
      const next_x = current_x + item[0];
      const next_y = current_y + item[1];

      if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length && grid[next_x][next_y] === 1) {
        queue.push([next_x, next_y, current_step + 1]);
      }
    }
  }

  return -1;
}

// debug your code below
const grid = [
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];
const sr = 0,
  sc = 0,
  tr = 2,
  tc = 0;

const res = shortestCellPath(grid, sr, sc, tr, tc);
console.log(res);
