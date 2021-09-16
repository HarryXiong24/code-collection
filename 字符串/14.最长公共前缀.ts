// 14 最长公共前缀

/*
 * 编写一个函数来查找字符串数组中的最长公共前缀
 * 如果不存在公共前缀，返回空字符串 ""
 */

export function longestCommonPrefix(strs: string[]): string {
  // 先找出最短的字符串
  let min: string = strs[0];
  for (let i = 1; i < strs.length; i++) {
    if (min.length > strs[i].length) {
      min = strs[i];
    }
  }

  let len: number = min.length;
  // 外层循环 min 的长度
  for (let i = 0; i < len; i++) {
    let flag = true;
    for (let j = 0; j < strs.length; j++) {
      if (!strs[j].includes(min)) {
        flag = false;
        continue;
      }
    }
    // 如果不包含，则 min 长度减一
    if (flag === false) {
      min = min.slice(0, min.length - 2);
    } else {
      return min;
    }
  }

  return '';
}

// test
let res1 = longestCommonPrefix(['flower', 'flow', 'flight']);
let res2 = longestCommonPrefix(['dog', 'racecar', 'car']);
let res3 = longestCommonPrefix(['reflower', 'flow', 'flight']);
console.log(res1);
console.log(res2);
console.log(res3);
