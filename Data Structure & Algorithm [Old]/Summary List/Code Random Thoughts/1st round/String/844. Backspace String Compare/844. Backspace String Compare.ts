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

export function backspaceCompare(s: string, t: string): boolean {
  const stack1: string[] = [];
  const stack2: string[] = [];

  for (const item of s) {
    if (item === '#') {
      stack1.pop();
    } else {
      stack1.push(item);
    }
  }

  for (const item of t) {
    if (item === '#') {
      stack2.pop();
    } else {
      stack2.push(item);
    }
  }

  return stack1.join('') === stack2.join('');
}

// test
const res = backspaceCompare('ab#c', 'ad#c');
console.log(res);
