// 130. Surrounded Regions

// Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.

// Example 1:
// Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
// Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
// Explanation: Notice that an 'O' should not be flipped if:
// - It is on the border, or
// - It is adjacent to an 'O' that should not be flipped.
// The bottom 'O' is on the border, so it is not flipped.
// The other three 'O' form a surrounded region, so they are flipped.

// Example 2:
// Input: board = [["X"]]
// Output: [["X"]]

/**
 Do not return anything, modify board in-place instead.
 */
export function solve(board: string[][]): void {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Set<string>();
  let isOnBoard: boolean = false;
  let result: number[][] = [];

  const recursive = (i: number, j: number, result: number[][]) => {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
      isOnBoard = true;
      return;
    }
    if (board[i][j] === 'X' || visited.has(`row${i}-col${j}`)) {
      return;
    }
    visited.add(`row${i}-col${j}`);
    result.push([i, j]);
    for (const item of directions) {
      recursive(i + item[0], j + item[1], result);
    }
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 'O') {
        isOnBoard = false;
        visited.clear();
        result = [];
        recursive(i, j, result);
        if (!isOnBoard) {
          for (const item of result) {
            const x = item[0];
            const y = item[1];
            board[x][y] = 'X';
          }
        }
      }
    }
  }
}

// test
const board = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
];
solve(board);
console.log(board);
