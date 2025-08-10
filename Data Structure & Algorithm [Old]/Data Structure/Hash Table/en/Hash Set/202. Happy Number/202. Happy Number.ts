// 202. Happy Number

// Write an algorithm to determine if a number n is happy.

// A happy number is a number defined by the following process:

// Starting with any positive integer, replace the number by the sum of the squares of its digits.
// Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
// Those numbers for which this process ends in 1 are happy.
// Return true if n is a happy number, and false if not.

// Example 1:
// Input: n = 19
// Output: true
// Explanation:
// 12 + 92 = 82
// 82 + 22 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1

// Example 2:
// Input: n = 2
// Output: false

// the important resolution key is, the result will have two forms:
// linked and cycle
// if it is a cycle, which means that it loops endlessly and it isn't a happy number, vice versa
export function isHappy(n: number): boolean {
  const cache = new Set<number>();
  let current = n;

  while (current !== 1) {
    current = cycle(current);
    if (!cache.has(current)) {
      cache.add(current);
    } else {
      return false;
    }
  }

  return true;
}

function cycle(n: number) {
  let sum = 0;
  let len = String(n).length;
  for (let i = 0; i < len; i++) {
    sum += (n % 10) ** 2;
    n = (n - (n % 10)) / 10;
  }
  return sum;
}

// test
const res = isHappy(19);
console.log(res);
