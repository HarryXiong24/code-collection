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

type operators = '+' | '-' | '*' | '/';

function calculate(before: number, after: number, operators: operators): number {
  if (operators === '+') {
    return before + after;
  }
  if (operators === '-') {
    return before - after;
  }
  if (operators === '*') {
    return before * after;
  }
  // 整除的情况也要考虑负数
  if (operators === '/') {
    if (before / after >= 0) {
      // 返回值为小于等于其数值参数的最大整数值
      return Math.floor(before / after);
    } else {
      // 返回值为大于等于其数字参数的最小整数
      return Math.ceil(before / after);
    }
  }
  return 0;
}

export function evalRPN(tokens: string[]): number {
  let set: Set<string> = new Set(['+', '-', '*', '/']);
  let stack: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (!set.has(tokens[i])) {
      stack.push(tokens[i]);
    } else {
      const after = Number(stack.pop())!;
      const before = Number(stack.pop())!;
      const temp = calculate(before, after, tokens[i] as operators);
      stack.push(String(temp));
    }
    console.log(stack);
  }

  return Number(stack.pop());
}

// test
const res = evalRPN(['4', '13', '5', '/', '+']);
const res2 = evalRPN(['2', '1', '+', '3', '*']);
const res3 = evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']);
console.log(res);
console.log(res2);
console.log(res3);
