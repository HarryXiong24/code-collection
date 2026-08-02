// DESCRIPTION (inspired by Leetcode.com)
// Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring. A well-formed parentheses string is one that follows these rules:

// Open brackets must be closed by a matching pair in the correct order.
// For example, given the string "(()", the longest valid parentheses substring is "()", which has a length of 2. Another example is the string ")()())", where the longest valid parentheses substring is "()()", which has a length of 4.

// Example 1:
// Inputs:
// s = "())))"
// Output:
// 2
// (Explanation: The longest valid parentheses substring is "()")

// Example 2:
// Inputs:
// s = "((()()())"
// Output:
// 8
// (Explanation: The longest valid parentheses substring is "(()()())" with a length of 8)

// Example 3:
// Inputs:
// s = ""
// Output:
// 0

// Time Complexity: O(n) - where n is the length of the input string
// Space Complexity: O(n) - where n is the length of the input string (for the stack)
export class Solution {
  longest_valid_parentheses(s: string): number {
    let longest_length = 0;
    const stack: number[] = [-1];

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        stack.push(i);
      } else {
        const top = stack.pop()!;
        if (stack.length > 0) {
          longest_length = Math.max(longest_length, i - stack[stack.length - 1]);
        } else {
          stack.push(i);
        }
      }
    }

    return longest_length;
  }
}

// test
const res = new Solution().longest_valid_parentheses('())))');
const res1 = new Solution().longest_valid_parentheses('((()()())');
const res2 = new Solution().longest_valid_parentheses('()(()');
console.log(res);
console.log(res1);
console.log(res2);
