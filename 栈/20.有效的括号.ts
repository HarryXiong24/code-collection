// 20 有效的括号

/*
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合
 * 2. 左括号必须以正确的顺序闭合
 */

export function isValid(s: string): boolean {
  const len = s.length;

  // 如果逢单则说明一定不配对，直接返回
  if (len % 2 === 1) {
    return false;
  }
  // 定义键值对
  const pairs: Map<string, string> = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  // 定义栈
  // 思路是如果栈里没有匹配到键，则往里面 push，匹配到了就 pop
  let stack: string[] = [];
  for (let char of s) {
    if (pairs.has(char)) {
      // 取出栈顶的左括号并判断它们是否是相同类型的括号
      // 如果不是相同的类型 -> stack[stack.length - 1] !== pairs.get(char)
      // 或者栈中并没有左括号 -> !stack.length
      // 那么字符串 s 无效
      if (!stack.length || stack[stack.length - 1] !== pairs.get(char)) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0 ? true : false;
}

// test
let res = isValid('({[]})');
console.log(res);
