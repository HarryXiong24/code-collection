// 1249. Minimum Remove to Make Valid Parentheses

// Given a string s of '(' , ')' and lowercase English characters.

// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

// Formally, a parentheses string is valid if and only if:

// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.

// Example 1:
// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

// Example 2:
// Input: s = "a)b(c)d"
// Output: "ab(c)d"

// Example 3:
// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.

export function minRemoveToMakeValid(s: string): string {
  const stack_for_record_index: number[] = [];
  const result: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      result.push('(');
      stack_for_record_index.push(result.length - 1);
    } else if (s[i] === ')') {
      if (stack_for_record_index.length) {
        stack_for_record_index.pop();
        result.push(')');
      }
    } else {
      result.push(s[i]);
    }
  }

  while (stack_for_record_index.length) {
    result.splice(stack_for_record_index.pop()!, 1);
  }

  return result.join('');
}

// test
const res1 = minRemoveToMakeValid('lee(t(c)o)de)');
console.log(res1);

const res2 = minRemoveToMakeValid('a)b(c)d');
console.log(res2);

const res3 = minRemoveToMakeValid('))((');
console.log(res3);
