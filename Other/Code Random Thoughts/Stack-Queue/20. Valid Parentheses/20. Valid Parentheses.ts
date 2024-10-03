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

// Example 4:
// Input: s = "([])"
// Output: true

export function isValid(s: string): boolean {
  const map = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  const stack: string[] = [];

  for (const char of s) {
    if (!map.has(char)) {
      stack.push(char);
    } else {
      if (!stack.length || map.get(char) !== stack.pop()!) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// test
const res = isValid('([])');
console.log(res);
