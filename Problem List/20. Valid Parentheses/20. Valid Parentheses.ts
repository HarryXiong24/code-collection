// 20. Valid Parentheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:
// Input: s = "()"
// Output: true

// Example 2:
// Input: s = "()[]{}"
// Output: true

// Example 3:
// Input: s = "(]"
// Output: false

export function isValid(s: string): boolean {
  const map: Map<string, string> = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  const stack: string[] = [];

  if (s.length % 2 !== 0) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      const value = map.get(current);
      if (value !== stack.pop()!) {
        return false;
      }
    } else {
      stack.push(s[i]);
    }
  }

  return stack.length ? false : true;
}

// test
const res = isValid('()[]{}');
console.log(res);
