// 70 爬楼梯

/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 输入：n = 2
 * 输出：2
 * 解释：有两种方法可以爬到楼顶
 * 1. 1 阶 + 1 阶
 * 2. 2 阶
 */

// 数大了会溢出
export function climbStairs(n: number): number {
  const cache: Map<number, number> = new Map();

  if (n === 0 || n === 1) {
    return 1;
  }

  if (cache.has(n)) {
    return cache.get(n)!;
  } else {
    cache.set(n, climbStairs(n - 2) + climbStairs(n - 1));
  }

  return cache.get(n)!;
}

// test
const res = climbStairs(10);
console.log(res);
