// 118 杨辉三角

/**
 * 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和
 * 示例 1:
 * 输入: numRows = 5
 * 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 */

function generate(numRows: number): number[][] {
  let result: number[][] = [];
  add(result, numRows, 0);
  return result;
}

function add(list: number[][], numRows: number, level: number) {
  // 终止条件
  if (numRows === level) {
    return [];
  }
  // 递归前
  let newRow = new Array(level + 1).fill(1);
  const lastList = list[level - 1];
  for (let i = 1; i < newRow.length - 1; i++) {
    // 关系式
    newRow[i] = lastList[i - 1] + lastList[i];
  }
  list.push(newRow);
  // 开始递归
  add(list, numRows, level + 1);
}

// test
const res = generate(5);
console.log(res);
