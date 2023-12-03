// 994. Rotting Oranges

// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

// Example 1:
// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4

// Example 2:
// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

// Example 3:
// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

export function orangesRotting(grid: number[][]): number {
  const queue: number[][] = [];
  let fresh_oranges: number = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
      if (grid[i][j] == 1) {
        fresh_oranges += 1;
      }
    }
  }

  // Mark the round / level, _i.e_ the ticker of timestamp
  queue.push([-1, -1]);

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let minutes_elapsed = -1;

  while (queue.length) {
    const [row, col] = queue.shift()!;

    // We finish one round of processing
    if (row === -1 && col === -1) {
      minutes_elapsed++;
      if (queue.length) {
        queue.push([-1, -1]);
      }
    } else {
      for (const direction of directions) {
        const next_row = row + direction[0];
        const next_col = col + direction[1];
        if (next_row < grid.length && next_row >= 0 && next_col < grid[0].length && next_col >= 0) {
          if (grid[next_row][next_col] === 1) {
            grid[next_row][next_col] = 2;
            fresh_oranges--;
            queue.push([next_row, next_col]);
          }
        }
      }
    }
  }

  return fresh_oranges === 0 ? minutes_elapsed : -1;
}

// test
const res = orangesRotting([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]);
console.log(res);
