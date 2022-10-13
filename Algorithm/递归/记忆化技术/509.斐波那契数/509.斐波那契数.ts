// 509 斐波那契数

/**
 * 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列
 * 该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和
 * 也就是：
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 给定 n ，请计算 F(n)
 * 输入：n = 2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
 */

export function fib(n: number): number {
  let res = 0;
  // 使用集合来存放记忆出现过的值
  const cache: Map<number, number> = new Map();

  if (cache.has(n)) {
    return res;
  }

  if (n < 2) {
    return n;
  } else {
    res = fib(n - 1) + fib(n - 2);
  }

  cache.set(n, res);

  return res;
}

// test
const res = fib(10);
console.log(res);
