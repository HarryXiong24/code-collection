// 150 逆波兰表达式求值

/**
 * 根据 逆波兰表示法，求表达式的值
 * 有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式
 * 说明：
 * 整数除法只保留整数部分
 * 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况
 * 示例：
 * 输入：tokens = ["4","13","5","/","+"]
 * 输出：6
 * 解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
 */

type operators = '+' | '-' | '*' | '/';

export function evalRPN(tokens: string[]): number {
  let set: Set<string> = new Set(['+', '-', '*', '/']);
  let stack: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (!set.has(tokens[i])) {
      stack.push(tokens[i]);
    } else {
      const after = Number(stack.pop())!;
      const before = Number(stack.pop())!;
      let temp = calculate(before, after, tokens[i] as operators);
      stack.push(String(temp));
    }
    console.log(stack);
  }

  return Number(stack.pop());
}

function calculate(
  before: number,
  after: number,
  operators: operators
): number {
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

// test
const res = evalRPN(['4', '13', '5', '/', '+']);
const res2 = evalRPN(['2', '1', '+', '3', '*']);
const res3 = evalRPN([
  '10',
  '6',
  '9',
  '3',
  '+',
  '-11',
  '*',
  '/',
  '*',
  '17',
  '+',
  '5',
  '+',
]);
console.log(res);
console.log(res2);
console.log(res3);
