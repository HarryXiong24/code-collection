// 151.翻转字符串里的单词

/**
 * 给你一个字符串 s , 逐个翻转字符串中的所有单词
 * 单词是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开
 * 请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。
 * 说明：
 * 1.输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
 * 2.翻转后单词间应当仅用一个空格分隔。
 * 3.翻转后的字符串中不应包含额外的空格
 */

export function reverseWords(s: string): string {
  let arr = s.split(' ');

  // 需要过滤掉空字符串
  arr = arr.filter((value) => {
    return value !== '';
  });

  return arr.reverse().join(' ');
}

// test
const res = reverseWords('  Bob    Loves  Alice   ');
console.log(res);
