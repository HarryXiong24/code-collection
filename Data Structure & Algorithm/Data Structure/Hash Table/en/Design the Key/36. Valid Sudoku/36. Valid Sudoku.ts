// 36. Valid Sudoku

// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

// Note:
// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

// Example 1:
// Input: board =
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: true

// Example 2:
// Input: board =
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

// There are 2 methods to define hash key, let talk about it.
// First method is not so good. We need to create 9 row set, 9 column set, 9 cell set to record different groups.
// Second way is to structure string, use a special header in the string to represent the different groups. This way saves 9 times space.

// Time Complexity: O(n^2)
// Space Complexity: O(n)
export function isValidSudoku(board: string[][]): boolean {
  const rowSet = new Set();
  const columnSet = new Set();
  const cellSet = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const current = board[i][j];
      if (current === '.') {
        continue;
      }

      const sqrtI = Math.floor(i / 3);
      const sqrtJ = Math.floor(j / 3);

      const rowValue = `${i}-${board[i][j]}`;
      const columnValue = `${j}-${board[i][j]}`;
      const squareValue = `${sqrtI}${sqrtJ}-${board[i][j]}}`;

      if (rowSet.has(rowValue) || columnSet.has(columnValue) || cellSet.has(squareValue)) {
        return false;
      }

      rowSet.add(rowValue);
      columnSet.add(columnValue);
      cellSet.add(squareValue);
    }
  }

  return true;
}

// test
const board = [
  ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
const res = isValidSudoku(board);
console.log(res);
