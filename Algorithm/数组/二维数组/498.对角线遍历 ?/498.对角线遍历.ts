// 498 对角线遍历

/**
 * 给定一个含有 M x N 个元素的矩阵（M 行，N 列）
 * 请以对角线遍历的顺序返回这个矩阵中的所有元素
 * 输入:
 * [
 *  [ 1, 2, 3 ],
 *  [ 4, 5, 6 ],
 *  [ 7, 8, 9 ]
 * ]
 * 输出:  [1,2,4,7,5,3,6,8,9]
 */

// 对角线遍历，x+y 是固定值，和是奇数反向遍历，偶数正向遍历

export function findDiagonalOrder(mat: number[][]): number[] {
  // 用于存放结果的数组
  const res = [];
  // 矩阵 row
  const row = mat.length;
  // 矩阵 col
  const col = mat[0].length;

  // 对角线遍历，画图可知共需遍历 h + w - 1 层，从 0 开始计算每层
  for (let l = 0; l < row + col - 1; l++) {
    const tmp = [];

    // 第 l 层从右上角作为起始点
    let x = l < col ? 0 : l - col + 1; // 起始点横坐标
    let y = l < col ? l : col - 1; // 起始点纵坐标

    // 从起始点开始沿对角线遍历
    while (x < row && y >= 0) {
      tmp.push(mat[x][y]);
      x++;
      y--;
    }

    // 偶数层遍历结果需要反转
    if (l % 2 === 0) {
      tmp.reverse();
    }

    // 将本层遍历结果放入结果数组
    res.push(...tmp);
  }

  return res;
}

// test
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const res = findDiagonalOrder(arr);
console.log(res);
