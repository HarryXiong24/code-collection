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
  const processString = (str: string): string => {
    const result: string[] = [];

    for (let char of str) {
      if (char === '#') {
        if (result.length > 0) {
          result.pop();
        }
      } else {
        result.push(char);
      }
    }

    return result.join('');
  };

  return processString(s) === processString(t);
}

// O(n) time and O(1) space?
export function backspaceCompare1(s: string, t: string): boolean {
  let i = s.length - 1;
  let j = t.length - 1;

  while (i >= 0 || j >= 0) {
    // Find the next valid character in string s
    let backspaceCount = 0;
    while (i >= 0) {
      if (s[i] === '#') {
        backspaceCount++;
        i--;
      } else if (backspaceCount > 0) {
        backspaceCount--;
        i--;
      } else {
        break;
      }
    }

    // Find the next valid character in string t
    backspaceCount = 0;
    while (j >= 0) {
      if (t[j] === '#') {
        backspaceCount++;
        j--;
      } else if (backspaceCount > 0) {
        backspaceCount--;
        j--;
      } else {
        break;
      }
    }

    if (i >= 0 && j >= 0 && s[i] !== t[j]) {
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
const res = backspaceCompare('ab#c', 'ad#c');
const res1 = backspaceCompare('ab#c', 'ad#c');
console.log(res);
console.log(res1);
