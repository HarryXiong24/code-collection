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

// Using stack
// Time Complexity: O(⁡n)
// Space Complexity: O(n)
export function backspaceCompare(s: string, t: string): boolean {
  const stack_s: string[] = [];
  const stack_t: string[] = [];

  for (const item of s) {
    if (item !== '#') {
      stack_s.push(item);
    } else {
      stack_s.pop();
    }
  }

  for (const item of t) {
    if (item !== '#') {
      stack_t.push(item);
    } else {
      stack_t.pop();
    }
  }

  if (stack_s.length !== stack_t.length) {
    return false;
  }

  while (stack_s.length) {
    if (stack_s.pop() !== stack_t.pop()) {
      return false;
    }
  }

  return true;
}

// Double point, Optimize
// Iterate through the string in reverse. If we see a backspace character, the next non-backspace character is skipped. If a character isn't skipped, it is part of the final answer.
// Time Complexity: O(⁡n)
// Space Complexity: O(1)
export function backspaceCompare1(s: string, t: string): boolean {
  let i: number = s.length - 1;
  let j: number = t.length - 1;
  let skipS: number = 0;
  let skipT: number = 0;

  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (s[i] === '#') {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else {
        break;
      }
    }

    while (j >= 0) {
      if (t[j] === '#') {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else {
        break;
      }
    }

    console.log(s[i], t[j], i, j);

    if (s[i] !== t[j] && i >= 0 && j >= 0) {
      return false;
    }
    if ((i >= 0 && j < 0) || (i < 0 && j >= 0)) {
      return false;
    }
    i--;
    j--;
  }

  return true;
}

// test
const res = backspaceCompare1('bbbextm', 'bbb#extm');
console.log(res);
