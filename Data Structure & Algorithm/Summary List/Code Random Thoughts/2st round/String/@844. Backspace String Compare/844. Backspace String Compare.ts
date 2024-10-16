// 844. Backspace String Compare

// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

// Note that after backspacing an empty text, the text will continue empty.

// Example 1:
// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".

// Example 2:
// Input: s = "ab##", t = "c#d#"
// Output: true
// Explanation: Both s and t become "".

// Example 3:
// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

// O(n) time and O(1) space
export function backspaceCompare(s: string, t: string): boolean {
  let i = s.length - 1;
  let j = t.length - 1;

  while (i >= 0 || j >= 0) {
    let backspace = 0;

    while (i >= 0) {
      if (s[i] === '#') {
        backspace++;
        i--;
      } else if (backspace > 0) {
        i--;
        backspace--;
      } else {
        break;
      }
    }

    backspace = 0;
    while (j >= 0) {
      if (t[j] === '#') {
        backspace++;
        j--;
      } else if (backspace > 0) {
        j--;
        backspace--;
      } else {
        break;
      }
    }

    if (s[i] !== t[j]) {
      return false;
    }

    if ((i >= 0 && j < 0) || (j >= 0 && i < 0)) {
      return false;
    }

    i--;
    j--;
  }

  return true;
}

// test
const res = backspaceCompare('ab#c', 'ad#c');
console.log(res);
