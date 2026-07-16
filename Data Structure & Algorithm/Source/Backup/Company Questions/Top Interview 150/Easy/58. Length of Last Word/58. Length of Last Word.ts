// 58. Length of Last Word

// Given a string s consisting of words and spaces, return the length of the last word in the string.

// A word is a maximal substring consisting of non-space characters only.

// Example 1:
// Input: s = "Hello World"
// Output: 5
// Explanation: The last word is "World" with length 5.

// Example 2:
// Input: s = "   fly me   to   the moon  "
// Output: 4
// Explanation: The last word is "moon" with length 4.

// Example 3:
// Input: s = "luffy is still joyboy"
// Output: 6
// Explanation: The last word is "joyboy" with length 6.

// T: O(n)
// S: O(1)
export function lengthOfLastWord(s: string): number {
  let count = 0;
  let is_begin = false;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ' ' && is_begin === false) {
      count = 0;
    } else if (s[i] !== ' ') {
      count++;
      is_begin = true;
    }

    if (is_begin === true && s[i] === ' ') {
      break;
    }
  }

  return count;
}

// test
const res = lengthOfLastWord('luffy is still joyboy');
console.log(res);
