// 50 Pow(x, n)

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
  const half = myPositivePow(x, Math.floor(n / 2));
  if (n % 2 == 0) {
    return half * half;
  } else {
    return half * half * x;
  }
}

export function myPow(x: number, n: number): number {
  const power = n >= 0 ? n : -n;
  const res = myPositivePow(x, power);
  return n >= 0 ? res : 1 / res;
}

// test
const res = myPow(2, 10);
console.log(res);
