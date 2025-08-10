// 542. 01 Matrix

// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

// The distance between two adjacent cells is 1.

// Example 1:
// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]

// Example 2:
// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]

export function updateMatrix(mat: number[][]): number[][] {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue: number[][] = [];
  const set = new Set<string>();

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j, 0]);
        set.add(`row${i}-col${j}`);
      }
    }
  }

  while (queue.length) {
    const size = queue.length;
    for (let count = 0; count < size; count++) {
      const [current_i, current_j, steps] = queue.shift()!;

      for (const item of directions) {
        const next_i = current_i + item[0];
        const next_j = current_j + item[1];
        if (
          next_i < 0 ||
          next_i >= mat.length ||
          next_j < 0 ||
          next_j >= mat[0].length ||
          set.has(`row${next_i}-col${next_j}`)
        ) {
          continue;
        }
        set.add(`row${next_i}-col${next_j}`);
        mat[next_i][next_j] = steps + 1;
        queue.push([next_i, next_j, steps + 1]);
      }
    }
  }

  return mat;
}

// Time Limit Exceed
export function updateMatrix_general(mat: number[][]): number[][] {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const BFS = (i: number, j: number) => {
    const queue: number[][] = [[i, j]];
    let steps = 0;
    while (queue.length) {
      const size = queue.length;
      for (let count = 0; count < size; count++) {
        const [current_i, current_j] = queue.shift()!;
        if (mat[current_i][current_j] === 0) {
          mat[i][j] = steps;
          return;
        }
        for (const item of directions) {
          const next_i = current_i + item[0];
          const next_j = current_j + item[1];
          if (next_i < 0 || next_i >= mat.length || next_j < 0 || next_j >= mat[0].length) {
            continue;
          }
          queue.push([next_i, next_j]);
        }
      }
      steps++;
    }
  };

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 1) {
        BFS(i, j);
      }
    }
  }

  return mat;
}

// test
const res = updateMatrix([
  [0, 0, 0],
  [0, 1, 0],
  [1, 1, 1],
]);
console.log(res);
