// 541. Reverse String II

// Given a string s and an integer k, reverse the first k characters for every 2k characters counting from the start of the string.

// If there are fewer than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and leave the other as original.

// Example 1:
// Input: s = "abcdefg", k = 2
// Output: "bacdfeg"

// Example 2:
// Input: s = "abcd", k = 2
// Output: "bacd"

export function reverseStr(s: string, k: number): string {
  const arr = s.split('');

  for (let i = 0; i < arr.length; i = i + 2 * k) {
    const subArray = arr.slice(i, i + k).reverse();
    arr.splice(i, k, ...subArray);
  }

  return arr.join('');
}

// test
const res = reverseStr('abcdefg', 2);
console.log(res);
