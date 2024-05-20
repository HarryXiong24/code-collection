// 51. N-Queens

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

// Example 1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

// Example 2:
// Input: n = 1
// Output: [["Q"]]

const transformBoard = (board: string[][]): string[] => {
  const resArr = [];
  for (let row of board) {
    resArr.push(row.join(''));
  }
  return resArr;
};

const isValid = (col: number, row: number, board: string[][]): boolean => {
  const n: number = board.length;
  if (col < 0 || col >= n || row < 0 || row >= n) {
    return false;
  }

  for (let row of board) {
    if (row[col] === 'Q') {
      return false;
    }
  }

  let x: number = col;
  let y: number = row;
  while (y >= 0 && x < n) {
    if (board[y--][x++] === 'Q') {
      return false;
    }
  }

  x = col;
  y = row;

  while (x >= 0 && y >= 0) {
    if (board[y--][x--] === 'Q') {
      return false;
    }
  }

  return true;
};

export function solveNQueens(n: number): string[][] {
  const board: string[][] = new Array(n).fill(0).map((_) => new Array(n).fill('.'));
  const results: string[][] = [];

  const backtrack = (rowNum: number, board: string[][]) => {
    if (rowNum === n) {
      results.push(transformBoard(board));
      return;
    }
    for (let i = 0; i < n; i++) {
      if (isValid(i, rowNum, board) === true) {
        board[rowNum][i] = 'Q';
        backtrack(rowNum + 1, board);
        board[rowNum][i] = '.';
      }
    }
  };

  backtrack(0, board);
  return results;
}

// test
const res = solveNQueens(4);
console.log(res);
