// 1091. Shortest Path in Binary Matrix

// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

// All the visited cells of the path are 0.
// All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number of visited cells of this path.

// Example 1:
// Input: grid = [[0,1],[1,0]]
// Output: 2

// Example 2:
// Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
// Output: 4

// Example 3:
// Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
// Output: -1

// BFS
export function shortestPathBinaryMatrix(grid: number[][]): number {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const n = grid.length - 1;

  if (grid[0][0] === 1 || grid[n][n] === 1) {
    return -1;
  }

  const queue: number[][] = [[0, 0, 1]];
  const visited = new Set();

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y, count] = queue.shift()!;
      if (x === n && y === n) {
        return count;
      }
      visited.add(`row${x}-col${y}`);
      for (const item of directions) {
        const i = x + item[0];
        const j = y + item[1];
        if (i >= 0 && i <= n && j >= 0 && j <= n && grid[i][j] === 0 && !visited.has(`row${i}-col${j}`)) {
          queue.push([i, j, count + 1]);
        }
      }
    }
  }

  return -1;
}

// DFS
export function shortestPathBinaryMatrix_DFS(grid: number[][]): number {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const visited = new Set();
  let min = Infinity;

  if (grid[0][0] === 1 || grid[grid.length - 1][grid.length - 1] === 1) {
    return -1;
  }

  const recursive = (x: number, y: number, step: number) => {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid.length) {
      return;
    }
    if (grid[x][y] === 1) {
      return;
    }
    if (visited.has(`row${x}-col${y}`)) {
      return;
    }
    if (step > min) {
      return;
    }
    if (x === grid.length - 1 && y === grid.length - 1 && grid[x][y] === 0) {
      min = step;
    }
    for (const item of directions) {
      step++;
      visited.add(`row${x}-col${y}`);
      recursive(x + item[0], y + item[1], step);
      visited.delete(`row${x}-col${y}`);
      step--;
    }
  };

  recursive(0, 0, 0);

  return min === Infinity ? -1 : min + 1;
}

// test
const res = shortestPathBinaryMatrix([
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]);
console.log(res);
