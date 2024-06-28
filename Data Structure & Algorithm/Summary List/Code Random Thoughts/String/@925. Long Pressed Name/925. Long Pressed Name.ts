// 925. Long Pressed Name

// Your friend is typing his name into a keyboard. Sometimes, when typing a character c, the key might get long pressed, and the character will be typed 1 or more times.

// You examine the typed characters of the keyboard. Return True if it is possible that it was your friends name, with some characters (possibly none) being long pressed.

// Example 1:
// Input: name = "alex", typed = "aaleex"
// Output: true
// Explanation: 'a' and 'e' in 'alex' were long pressed.

// Example 2:
// Input: name = "saeed", typed = "ssaaedd"
// Output: false
// Explanation: 'e' must have been pressed twice, but it was not in the typed output.

export function isLongPressedName(name: string, typed: string): boolean {
  let i: number = 0;
  let j: number = 0;

  while (i < name.length && j < typed.length) {
    if (name[i] !== typed[j]) {
      return false;
    }

    i++;
    j++;

    if (i === name.length || name[i] !== name[i - 1]) {
      while (j < typed.length && typed[j] === typed[j - 1]) {
        j++;
      }
    }
  }
  return i === name.length && j === typed.length;
}

// test
const res = isLongPressedName('saeed', 'ssaaedd');
console.log(res);
