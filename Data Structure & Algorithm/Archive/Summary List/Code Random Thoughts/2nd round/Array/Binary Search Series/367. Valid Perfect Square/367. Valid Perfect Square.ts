// 367. Valid Perfect Square

// Given a positive integer num, return true if num is a perfect square or false otherwise.

// A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

// You must not use any built-in library function, such as sqrt.

// Example 1:
// Input: num = 16
// Output: true
// Explanation: We return true because 4 * 4 = 16 and 4 is an integer.

// Example 2:
// Input: num = 14
// Output: false
// Explanation: We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.

export function isPerfectSquare(num: number): boolean {
  if (num === 0) {
    return true;
  }

  let left = 1;
  let right = Math.ceil(num / 2); // here we need to get the Math.ceil value

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid * mid < num) {
      left = mid + 1;
    } else if (mid * mid > num) {
      right = mid - 1;
    } else {
      return true;
    }
  }

  return false;
}

// test
const res = isPerfectSquare(16);
console.log(res);
