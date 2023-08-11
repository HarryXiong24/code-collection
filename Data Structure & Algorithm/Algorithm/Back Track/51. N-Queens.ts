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
  const solutions: string[][] = [];
  const columns = new Set();
  const diagonal1 = new Set();
  const diagonal2 = new Set();
  const queens = new Array(n).fill(-1);

  const generateBoard = (): string[] => {
    const board: string[] = [];
    for (let i = 0; i < n; i++) {
      const result_row: string[] = new Array(n).fill('.');
      result_row[queens[i]] = 'Q';
      board.push(result_row.join(''));
    }
    return board;
  };

  const backTrack = (row: number) => {
    if (row === n) {
      const board = generateBoard();
      solutions.push(board);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (columns.has(col) || diagonal1.has(row - col) || diagonal2.has(row + col)) {
        continue;
      }
      queens[row] = col;
      columns.add(col);
      diagonal1.add(row - col);
      diagonal2.add(row + col);
      backTrack(row + 1);
      columns.delete(col);
      diagonal1.delete(row - col);
      diagonal2.delete(row + col);
    }
  };

  backTrack(0);

  return solutions;
}

// test
const res = solveNQueens(4);
console.log(res);
