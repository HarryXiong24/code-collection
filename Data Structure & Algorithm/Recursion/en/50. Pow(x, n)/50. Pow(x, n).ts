// 50. Pow(x, n)

// Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

// Example 1:
// Input: x = 2.00000, n = 10
// Output: 1024.00000

// Example 2:
// Input: x = 2.10000, n = 3
// Output: 9.26100

// Example 3:
// Input: x = 2.00000, n = -2
// Output: 0.25000
// Explanation: 2-2 = 1/22 = 1/4 = 0.25

function myPositivePow(x: number, n: number): number {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return x;
  }
  return x * myPositivePow(x, n - 1);
}

// need to consider negative and positive
export function myPow(x: number, n: number): number {
  const power = n >= 0 ? n : -n;
  const res = myPositivePow(x, power);
  return n >= 0 ? res : 1 / res;
}

// test
const res = myPow(0.1, 2);
console.log(res);
