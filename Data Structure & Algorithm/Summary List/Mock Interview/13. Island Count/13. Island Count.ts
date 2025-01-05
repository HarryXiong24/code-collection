// 13. Island Count

// Island Count
// Given a 2D array binaryMatrix of 0s and 1s, implement a function getNumberOfIslands that returns the number of islands of 1s in binaryMatrix.

// An island is defined as a group of adjacent values that are all 1s. A cell in binaryMatrix is considered adjacent to another cell if they are next to each either on the same row or column. Note that two values of 1 are not part of the same island if they’re sharing only a mutual "corner" (i.e. they are diagonally neighbors).

// Explain and code the most efficient solution possible and analyze its time and space complexities.

// Example:
// input:  binaryMatrix = [ [0,    1,    0,    1,    0],
//                          [0,    0,    1,    1,    1],
//                          [1,    0,    0,    1,    0],
//                          [0,    1,    1,    0,    0],
//                          [1,    0,    1,    0,    1] ]

// output: 6 # since this is the number of islands in binaryMatrix.
//           # See all 6 islands color-coded below.

export function getNumberOfIslands(binaryMatrix: number[][]) {
  if (!binaryMatrix || binaryMatrix.length === 0) {
    return 0;
  }

  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];
  let islandCount = 0;

  const bfs = (r: number, c: number) => {
    const queue = [[r, c]];

    while (queue.length > 0) {
      const [currentR, currentC] = queue.shift()!;
      binaryMatrix[currentR][currentC] = 0;

      for (const item of directions) {
        const newR = currentR + item[0];
        const newC = currentC + item[1];
        if (
          newR >= 0 &&
          newR < binaryMatrix.length &&
          newC >= 0 &&
          newC < binaryMatrix[0].length &&
          binaryMatrix[newR][newC] === 1
        ) {
          queue.push([newR, newC]);
        }
      }
    }
  };

  for (let i = 0; i < binaryMatrix.length; i++) {
    for (let j = 0; j < binaryMatrix[0].length; j++) {
      if (binaryMatrix[i][j] === 1) {
        bfs(i, j);
        islandCount++;
      }
    }
  }

  return islandCount;
}

export function getNumberOfIslandsDFS(binaryMatrix: number[][]) {
  if (!binaryMatrix || binaryMatrix.length === 0) {
    return 0;
  }

  let islandCount = 0;

  const dfs = (r: number, c: number) => {
    // Boundary checks and ensuring the cell is '1'
    if (r < 0 || c < 0 || r >= binaryMatrix.length || c >= binaryMatrix[0].length || binaryMatrix[r][c] === 0) {
      return;
    }

    // Mark the cell as visited by setting it to 0
    binaryMatrix[r][c] = 0;

    // Explore all four directions
    dfs(r - 1, c); // Up
    dfs(r + 1, c); // Down
    dfs(r, c - 1); // Left
    dfs(r, c + 1); // Right
  };

  for (let i = 0; i < binaryMatrix.length; i++) {
    for (let j = 0; j < binaryMatrix[0].length; j++) {
      if (binaryMatrix[i][j] === 1) {
        dfs(i, j);
        islandCount++;
      }
    }
  }

  return islandCount;
}

// test
const binaryMatrix = [
  [0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [1, 0, 1, 0, 1],
];
const res = getNumberOfIslands(binaryMatrix);
console.log(res);
