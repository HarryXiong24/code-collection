// 779 第K个语法符号

/**
 * 在第一行我们写上一个 0。接下来的每一行，将前一行中的0替换为01，1替换为10
 * 给定行数 N 和序数 K，返回第 N 行中第 K个字符。（K从1开始）
 *
 * 例子:
 * 输入: N = 1, K = 1
 * 输出: 0
 * 输入: N = 2, K = 1
 * 输出: 0
 * 输入: N = 2, K = 2
 * 输出: 1
 * 输入: N = 4, K = 5
 * 输出: 1
 *
 * 解释:
 * 第一行: 0
 * 第二行: 01
 * 第三行: 0110
 * 第四行: 01101001
 */

// 找规律，发现每一行的前半段就是上一行，后半段就是上一行的每个值反过来（0变1，1变0）
export function kthGrammar(n: number, k: number): number {
  if (n === 1) {
    return 0;
  }

  // 计算当前行的长度：2 的 N-1 次方
  const length = 2 ** (n - 1);

  // 如果 K 大于长度的一半，就是 K 所在位置是后半段
  if (k > length / 2) {
    // 先得到上一行的值，位置是 K 相对于后半段的位置
    let val = kthGrammar(n - 1, k - length / 2);
    // 然后把值反过来
    return val === 0 ? 1 : 0;
  }
  // 否则前半部分
  else {
    // 值就是上一行 K 位置的值
    return kthGrammar(n - 1, k);
  }
}

// test
const res = kthGrammar(4, 5);
console.log(res);
