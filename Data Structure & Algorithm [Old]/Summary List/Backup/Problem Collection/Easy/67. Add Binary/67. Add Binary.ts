// 67. Add Binary

// Given two binary strings a and b, return their sum as a binary string.

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"

// Split string to array and calculate the elements of array.
// Time Complexity: O(n)
// Space Complexity: O(n)
export function addBinary(a: string, b: string): string {
  const res: number[] = [];
  const a_arr = a.split('').reverse();
  const b_arr = b.split('').reverse();
  const [long, short] = a_arr.length > b_arr.length ? [a_arr, b_arr] : [b_arr, a_arr];

  let flag = 0;
  for (let i = 0; i < short.length; i++) {
    const current = Number(short[i]) + Number(long[i]) + flag;
    if (current <= 1) {
      res[i] = current;
      flag = 0;
    } else {
      res[i] = current - 2;
      flag = 1;
    }
  }

  for (let i = short.length; i < long.length; i++) {
    const current = Number(long[i]) + flag;
    if (current > 1) {
      res[i] = 0;
      flag = 1;
    } else {
      res[i] = current;
      flag = 0;
    }
  }

  if (flag === 1) {
    res.push(1);
  }

  return res.reverse().join('');
}

// test
const res = addBinary('1010', '1011');
console.log(res);
