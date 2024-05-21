// 37. Sudoku Solver

// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

// Example 1:
// Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
// Explanation: The input board is shown above and the only valid solution is shown below:

/**
 Do not return anything, modify board in-place instead.
 */
function isValid(col: number, row: number, val: string, board: string[][]): boolean {
  // Column Check
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    if (board[rowIndex][col] === val) {
      return false;
    }
  }
  // Row Check
  for (let colIndex = 0; colIndex < board.length; colIndex++) {
    if (board[row][colIndex] === val) {
      return false;
    }
  }
  // 3*3 check
  const startX = Math.floor(col / 3) * 3;
  const startY = Math.floor(row / 3) * 3;
  for (let rowIndex = startY; rowIndex < startY + 3; rowIndex++) {
    for (let colIndex = startX; colIndex < startX + 3; colIndex++) {
      if (board[rowIndex][colIndex] === val) {
        return false;
      }
    }
  }
  return true;
}

export function solveSudoku(board: string[][]): void {
  const n: number = 9;

  const backtrack = (n: number, board: string[][]): boolean => {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (board[row][col] === '.') {
          for (let i = 1; i <= n; i++) {
            if (isValid(col, row, String(i), board)) {
              board[row][col] = String(i);
              if (backtrack(n, board) === true) {
                return true;
              }
              board[row][col] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  backtrack(n, board);
}

// test
const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
solveSudoku(board);
console.log(board);
