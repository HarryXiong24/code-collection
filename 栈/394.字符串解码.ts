// 394 字符串解码

/*
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 * 示例
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 */

export function decodeString(s: string): string {
  let stack = [];
  let res: string = '';
  let count: number = 0;
  // 扫描每一个字符
  for (let i = 0; i < s.length; i++) {
    let item = s[i];
    if (item >= '0' && item <= '9') {
      // 获取当前循环的数字 如果以前有数字 加上当前的数字 要加10倍。 比如: 100[a]
      count = count * 10 + Number(item);
      continue;
    } else if (item === '[') {
      stack.push({ count, lastRes: res }); // 收集以前的结果以及本次的循环次数
      // 重置 收集本次入栈的字符
      res = '';
      count = 0;
      continue;
    } else if (item === ']') {
      let { count, lastRes } = stack.pop()!; // 出栈 这次循环几次字符以及以前收集的字符
      // 外面的栈最后结算 外面的值被认作lastRes添加 比如'dd3[a2[c]]' // 进第一个栈时把dd传进去做 lastRes
      res = lastRes + res.repeat(count); // 循环的字符串 + 以前收集的字符 拼接
      continue;
    }
    res += s[i];
    // 收集当前的字符
    // 不管是单独的: mn2[dd] res = 'mn'
    // 还是入栈的: [abc res = 'abc'
  }
  return res;
}

// test
let res = decodeString('2[abc]3[cd]ef');
console.log(res);
