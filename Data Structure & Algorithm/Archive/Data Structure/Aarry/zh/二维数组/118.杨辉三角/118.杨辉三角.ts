// 118 杨辉三角

/**
 * 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和
 */

export function generate(numRows: number): number[][] {
  let result: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    // 先生成一个全部是 1 的下一部分数组
    let newRow = new Array(i + 1).fill(1);
    // 新数组，除了一头一尾，中间项全部取自上一个数组
    for (let j = 1; j < newRow.length - 1; j++) {
      // 关系式
      newRow[j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    result.push(newRow);
  }
  return result;
}

// test
const res = generate(5);
console.log(res);
