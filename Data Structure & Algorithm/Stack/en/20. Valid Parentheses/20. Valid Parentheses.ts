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
  const len = s.length;

  // jf length is odd number, return directly
  if (len % 2 === 1) {
    return false;
  }

  // define key-value map
  const pairs: Map<string, string> = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  const stack: string[] = [];

  for (const char of s) {
    if (pairs.has(char)) {
      // Pop the left parenthesis at the top of the stack and determine whether they are the same type of parentheses
      const res = stack.pop();
      if (!res || res !== pairs.get(char)) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0 ? true : false;
}

// test
const res = isValid('({[]})');
console.log(res);
