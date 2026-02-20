// 150. Evaluate Reverse Polish Notation

// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

// Evaluate the expression. Return an integer that represents the value of the expression.

// Note that:

// The valid operators are '+', '-', '*', and '/'.
// Each operand may be an integer or another expression.
// The division between two integers always truncates toward zero.
// There will not be any division by zero.
// The input represents a valid arithmetic expression in a reverse polish notation.
// The answer and all the intermediate calculations can be represented in a 32-bit integer.

// Example 1:
// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

// Example 2:
// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6

// Example 3:
// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

type Operator = '+' | '-' | '*' | '/';

function calculate(before: number, after: number, operator: Operator): number {
  if (operator === '+') {
    return before + after;
  }
  if (operator === '-') {
    return before - after;
  }
  if (operator === '*') {
    return before * after;
  }
  if (operator === '/') {
    if (before / after >= 0) {
      return Math.floor(before / after);
    } else {
      return Math.ceil(before / after);
    }
  }
  return 0;
}

export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (!isNaN(Number(tokens[i]))) {
      stack.push(Number(tokens[i]));
    } else {
      const operator: Operator = tokens[i] as Operator;
      const after = stack.pop()!;
      const before = stack.pop()!;
      const result = calculate(before, after, operator);
      stack.push(result);
    }
  }

  return stack.pop()!;
}

// test
const res = evalRPN(['2', '1', '+', '3', '*']);
console.log(res);
