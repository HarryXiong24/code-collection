// 733. Flood Fill

// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

// You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

// Return the modified image after performing the flood fill.

// Example 1:
// Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
// Output: [[2,2,2],[2,2,0],[2,0,1]]
// Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
// Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.

// Example 2:
// Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
// Output: [[0,0,0],[0,0,0]]
// Explanation: The starting pixel is already colored 0, so no changes are made to the image.

// DFS
// Time Complexity: O(N)
// Space Complexity: O(N)
export function floodFill_DFS(image: number[][], sr: number, sc: number, color: number): number[][] {
  const start = image[sr][sc];

  if (start === color) {
    return image;
  }

  const dfs = (x: number, y: number) => {
    if (x < 0 || x >= image.length || y < 0 || y >= image[0].length || image[x][y] !== start) {
      return;
    } else {
      image[x][y] = color;

      dfs(x + 1, y);
      dfs(x - 1, y);
      dfs(x, y + 1);
      dfs(x, y - 1);
    }
  };

  dfs(sr, sc);

  return image;
}

// BFS
// Time Complexity: O(N)
// Space Complexity: O(N)
export function floodFill_BFS(image: number[][], sr: number, sc: number, color: number): number[][] {
  const start = image[sr][sc];
  const reconcile = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue: number[][] = [];
  queue.push([sr, sc]);

  if (start === color) {
    return image;
  }

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      image[current[0]][current[1]] = color;
      for (const round of reconcile) {
        let m = current[0] + round[0];
        let n = current[1] + round[1];
        if (m < 0 || m >= image.length || n < 0 || n >= image[0].length || image[m][n] !== start) {
          continue;
        }
        queue.push([m, n]);
      }
    }
  }

  return image;
}

// DFS Stack
// Time Complexity: O(N)
// Space Complexity: O(N)
export function floodFill_DFS_Stack(image: number[][], sr: number, sc: number, color: number): number[][] {
  const start = image[sr][sc];
  const reconcile = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const stack: number[][] = [];
  stack.push([sr, sc]);

  if (start === color) {
    return image;
  }

  while (stack.length) {
    const current = stack.pop()!;
    image[current[0]][current[1]] = color;
    for (const round of reconcile) {
      let m = current[0] + round[0];
      let n = current[1] + round[1];
      if (m < 0 || m >= image.length || n < 0 || n >= image[0].length || image[m][n] !== start) {
        continue;
      }
      stack.push([m, n]);
    }
  }

  return image;
}

// test
const res1 = floodFill_DFS(
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ],
  1,
  1,
  2
);
const res2 = floodFill_BFS(
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ],
  1,
  1,
  2
);
const res3 = floodFill_DFS_Stack(
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ],
  1,
  1,
  2
);
console.log(res1);
console.log(res2);
console.log(res3);
