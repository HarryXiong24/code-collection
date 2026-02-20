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

// Recursion - Memorization
// Time Complexity: O(n)
// Space Complexity: O(n)
export function climbStairs(n: number): number {
  const map = new Map<number, number>();

  const recursive = (current: number): number => {
    if (current === 1) {
      return 1;
    }
    if (current === 2) {
      return 2;
    }

    if (map.has(current)) {
      return map.get(current)!;
    } else {
      map.set(current, recursive(current - 1) + recursive(current - 2));
      return recursive(current - 1) + recursive(current - 2);
    }
  };
  return recursive(n);
}

// test
const res = climbStairs(100);
console.log(res);
