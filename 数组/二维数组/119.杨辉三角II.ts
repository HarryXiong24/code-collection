// 119 杨辉三角 II

/*
 * 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和
 * 输入: rowIndex = 3
 * 输出: [1,3,3,1]
 */

function getRow(rowIndex: number): number[] {
  let result: number[][] = [];

  for (let i = 0; i < rowIndex + 1; i++) {
    let newRow = new Array(i + 1).fill(1);
    for (let j = 1; j < newRow.length - 1; j++) {
      newRow[j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    result.push(newRow);
  }

  return result[rowIndex];
}

// test
let res = getRow(3);
console.log(res);
