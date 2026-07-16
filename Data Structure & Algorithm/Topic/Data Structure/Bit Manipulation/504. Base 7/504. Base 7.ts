// 504. Base 7

// Given an integer num, return a string of its base 7 representation.

// Example 1:
// Input: num = 100
// Output: "202"

// Example 2:
// Input: num = -7
// Output: "-10"

export function convertToBase7(num: number): string {
  if (num === 0) {
    return '0';
  }

  let res = '';
  let current = Math.abs(num);
  let remainder = 0;

  while (current !== 0) {
    remainder = current % 7;
    current = Math.floor(current / 7);
    res = remainder + res;
  }

  return num >= 0 ? res : `-${res}`;
}

// test
const res = convertToBase7(7);
console.log(res);
