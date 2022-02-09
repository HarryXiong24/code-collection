// 50 Pow(x, n)

/**
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，x^n ）
 * 示例 1：
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 * 示例 2：
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 * 示例 3：
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2-2 = 1/22 = 1/4 = 0.25
 */

function myPositivePow(x: number, n: number): number {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return x;
  }
  return x * myPositivePow(x, n - 1);
}

// 这里需要考虑正负
function myPow(x: number, n: number): number {
  const power = n >= 0 ? n : -n;
  const res = myPositivePow(x, power);
  return n >= 0 ? res : 1 / res;
}

// test
const res = myPow(0.1, 2);
console.log(res);
