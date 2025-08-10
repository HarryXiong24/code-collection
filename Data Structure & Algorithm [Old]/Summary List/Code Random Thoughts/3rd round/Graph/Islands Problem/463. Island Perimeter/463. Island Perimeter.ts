// 463. Island Perimeter

// You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

// The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

// Example 1:
// Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
// Output: 16
// Explanation: The perimeter is the 16 yellow stripes in the image above.

// Example 2:
// Input: grid = [[1]]
// Output: 4

// Example 3:
// Input: grid = [[1,0]]
// Output: 4

export function islandPerimeter(grid: number[][]): number {
  let perimeter = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        for (const direction of directions) {
          const next_x = i + direction[0];
          const next_y = j + direction[1];

          if (next_x >= 0 && next_x < grid.length && next_y >= 0 && next_y < grid[0].length) {
            if (grid[next_x][next_y] === 0) {
              // 陆地的旁边空格是水域，则说明找到一条边。
              perimeter += 1;
            }
          } else {
            // 如果该陆地上下左右的空格出界了，则说明是一条边
            perimeter += 1;
          }
        }
      }
    }
  }

  return perimeter;
}

// test
const res = islandPerimeter([
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
]);
console.log(res);
