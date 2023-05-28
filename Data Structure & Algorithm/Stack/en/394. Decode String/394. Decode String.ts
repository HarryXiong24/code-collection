// 394. Decode String

// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

// The test cases are generated so that the length of the output will never exceed 105.

// Example 1:
// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"

// Example 2:
// Input: s = "3[a2[c]]"
// Output: "accaccacc"

// Example 3:
// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

export function decodeString(s: string): string {
  const stack: [previous_res: string, repeat: number][] = [];
  let current_res = '';
  let repeat = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      stack.push([current_res, repeat]);
      repeat = 0;
      current_res = '';
    } else if (s[i] === ']') {
      const [previous_res, repeat] = stack.pop()!;
      current_res = previous_res + current_res.repeat(repeat);
    } else if (s[i].match(/[0-9]/)) {
      // hint: if condition is 100[leetcode], we need to handle consecutive number string
      repeat = repeat * 10 + Number(s[i]);
    } else {
      current_res += s[i];
    }
  }

  return current_res;
}

// test
const s = '3[a2[c]]';
const res = decodeString(s);
console.log(res);
