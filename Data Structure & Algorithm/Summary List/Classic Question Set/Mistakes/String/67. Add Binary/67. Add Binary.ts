// 67. Add Binary

// Given two binary strings a and b, return their sum as a binary string.

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"

export function addBinary(a: string, b: string): string {
  // first, convert string to number array is easier to think
  const res = [];
  // notice that the result should be reversed too
  const a_arr = a.split('').reverse();
  const b_arr = b.split('').reverse();
  const [long, short] = a_arr.length > b_arr.length ? [a_arr, b_arr] : [b_arr, a_arr];

  let carry = 0;
  // they are both have elements
  for (let i = 0; i < short.length; i++) {
    if (Number(long[i]) + Number(short[i]) + carry > 1) {
      res[i] = Number(long[i]) + Number(short[i]) + carry - 2;
      carry = 1;
    } else {
      res[i] = Number(long[i]) + Number(short[i]) + carry;
      carry = 0;
    }
  }

  // only the long array have elements
  for (let i = short.length; i < long.length; i++) {
    if (Number(long[i]) + carry === 2) {
      res[i] = 0;
      carry = 1;
    } else {
      res[i] = Number(long[i]) + carry;
      carry = 0;
    }
  }

  // last, if it still has carry, the length will be plus 1
  if (carry === 1) {
    res.push(1);
  }

  return res.reverse().join('');
}

// butter solution
export function addBinary1(a: string, b: string): string {
  let result = '';
  // it is a flag to represent carry
  let carry = 0;
  const max = Math.max(a.length, b.length);

  let i = 1;
  while (i <= max) {
    let temp = carry;
    if (a[a.length - i]) {
      temp += Number(a[a.length - i]);
    }
    if (b[b.length - i]) {
      temp += Number(b[b.length - i]);
    }
    // to calculate carry
    carry = Math.floor(temp / 2);
    // to calculate the result in this turn
    result = '' + (temp % 2) + result;
    i++;
  }
  // last, if it still has carry, the length will be plus 1
  if (carry > 0) {
    result = '' + carry + result;
  }
  return result;
}

// test
const res = addBinary('1010', '1011');
const res1 = addBinary1('11', '1');
console.log(res, res1);
