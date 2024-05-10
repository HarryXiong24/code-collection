// 79. Word Search

// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true

// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true

// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

export function exist(board: string[][], word: string): boolean {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const result: string[] = [];
  // the path that has been gone through cannot be gone twice
  const path = new Set();
  let flag = false;

  const recursive = (board: string[][], result: string[], i: number, j: number) => {
    if (result.join('') === word) {
      flag = true;
    }
    // handle boundary
    if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) {
      return;
    }
    if (board[i][j] !== word[result.length] || path.has(`row${i}-col${j}`)) {
      return;
    }
    for (const item of directions) {
      path.add(`row${i}-col${j}`);
      result.push(word[result.length]);
      recursive(board, result, i + item[0], j + item[1]);
      path.delete(`row${i}-col${j}`);
      result.pop();
    }
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === word[0]) {
        // make array empty
        result.splice(0, result.length);
        path.clear();
        recursive(board, result, i, j);
      }
    }
  }

  return flag ? true : false;
}

// test
const res = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCCED'
);
console.log(res);
const res1 = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'SEE'
);
console.log(res1);
const res2 = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCB'
);
console.log(res2);
const res3 = exist(
  [
    ['C', 'A', 'A'],
    ['A', 'A', 'A'],
    ['B', 'C', 'D'],
  ],
  'AAB'
);
console.log(res3);
