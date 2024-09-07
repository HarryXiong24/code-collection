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
  if (x === 0) {
    return 0;
  }

  let left = 1;
  let right = Math.ceil(x / 2); // here we need to get the Math.ceil value

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid * mid <= x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left >= 0) {
    return left - 1;
  } else {
    return -1;
  }
}

// test
const res = mySqrt(1);
console.log(res);
