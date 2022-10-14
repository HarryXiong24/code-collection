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

const cache: number[] = [];

export function climbStairs(n: number): number {
  cache[0] = 1;
  cache[1] = 1;

  if (n === 0 || n === 1) {
    return 1;
  }

  if (cache[n]) {
    return cache[n];
  } else {
    cache[n] = climbStairs(n - 2) + climbStairs(n - 1);
  }

  return cache[n];
}

// test
const res = climbStairs(44);
console.log(res);
