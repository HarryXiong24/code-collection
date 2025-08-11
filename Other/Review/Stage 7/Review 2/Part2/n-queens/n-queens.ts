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

export function solveNQueens(n: number): string[][] {
  const results: string[][] = [];
  const chessboard: string[][] = new Array(n).fill('.').map(() => new Array(n).fill('.'));

  const isValid = (row: number, col: number, chessboard: string[][], n: number): boolean => {
    // col
    for (let i = 0; i < row; i++) {
      if (chessboard[i][col] === 'Q') {
        return false;
      }
    }

    // 45 degree
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i = i - 1, j = j - 1) {
      if (chessboard[i][j] === 'Q') {
        return false;
      }
    }

    // 135 degree
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i = i - 1, j = j + 1) {
      if (chessboard[i][j] === 'Q') {
        return false;
      }
    }

    return true;
  };

  const backtrack = (chessboard: string[][], row: number) => {
    if (row === n) {
      const temp = chessboard.map((item) => item.join(''));
      results.push(temp);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (!isValid(row, col, chessboard, n)) {
        continue;
      }

      chessboard[row][col] = 'Q';
      backtrack(chessboard, row + 1);
      chessboard[row][col] = '.';
    }
  };

  backtrack(chessboard, 0);

  return results;
}

// test
const res = solveNQueens(4);
console.log(res);
