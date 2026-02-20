// 921. Minimum Add to Make Parentheses Valid

// A parentheses string is valid if and only if:

// It is the empty string,
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.
// You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

// For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
// Return the minimum number of moves required to make s valid.

// Example 1:
// Input: s = "())"
// Output: 1

// Example 2:
// Input: s = "((("
// Output: 3

export function minAddToMakeValid(s: string): number {
  const stack: string[] = [];
  let unpaired_count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(s[i]); // Push to stack by incrementing count
    } else if (s[i] === ')') {
      if (stack.length) {
        stack.pop(); // Pop from stack if there's an unmatched '('
      } else {
        unpaired_count++; // If no '(' to match, increment unpaired ')'
      }
    }
  }

  return stack.length + unpaired_count;
}

// test
const res1 = minAddToMakeValid('())');
console.log(res1);

const res2 = minAddToMakeValid('(((');
console.log(res2);
