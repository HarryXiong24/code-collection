// 125 验证回文串

/**
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写
 * 说明：本题中，我们将空字符串定义为有效的回文串
 */

export function isPalindrome(s: string): boolean {
  if (s.length === 0 || s.trim() === '') {
    return true;
  }
  let str: string | undefined = s
    .match(/[A-Za-z0-9]+/g)
    ?.join('')
    .toLowerCase();
  if (str === undefined) {
    return true;
  }
  let left: number = 0;
  let right: number = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// test
const res = isPalindrome('A man, a plan, a canal: Panama');
const res2 = isPalindrome('race a car');
const res3 = isPalindrome('.');
console.log(res);
console.log(res2);
console.log(res3);
