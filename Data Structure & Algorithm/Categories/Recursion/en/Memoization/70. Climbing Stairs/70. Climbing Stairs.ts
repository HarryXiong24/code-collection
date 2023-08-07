// 70. Climbing Stairs

// You are climbing a staircase. It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Recursive
export function climbStairs(n: number): number {
  const cache = new Map<number, number>();

  const recursive = (n: number): number => {
    if (n === 1) {
      cache.set(1, 1);
      return 1;
    }

    if (n === 2) {
      cache.set(2, 2);
      return 2;
    }

    if (cache.has(n)) {
      return cache.get(n)!;
    } else {
      cache.set(n, recursive(n - 1) + recursive(n - 2));
      return recursive(n - 1) + recursive(n - 2);
    }
  };

  return recursive(n);
}

// test
const res = climbStairs(3);
console.log(res);
