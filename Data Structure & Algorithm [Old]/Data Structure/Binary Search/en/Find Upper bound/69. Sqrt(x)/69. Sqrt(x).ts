// 69. Sqrt(x)

// Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.
// You must not use any built-in exponent function or operator.
// For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.

// Example 1:
// Input: x = 4
// Output: 2
// Explanation: The square root of 4 is 2, so we return 2.

// Example 2:
// Input: x = 8
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

export function mySqrt(x: number): number {
  // accordding to the exponent rule, we know that the square root of n must less than n/2
  let min = 0;
  let max = Math.floor(x / 2) + 1;

  // Find Upper bound
  while (min <= max) {
    const mid = min + Math.floor((max - min) / 2);
    if (mid * mid <= x) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min - 1;
}

// test
const res = mySqrt(1);
console.log(res);
