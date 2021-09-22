// 345. 反转字符串中的元音字母

/*
 * 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串
 * 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现
 */

// 双指针
export function reverseVowels(s: string): string {
  // 集合用来保存元音字母，注意大小写都要保存
  const set: Set<string> = new Set([
    'a',
    'e',
    'i',
    'o',
    'u',
    'A',
    'E',
    'I',
    'O',
    'U',
  ]);
  // 字符串中只能读不能写，所以要转化成数组
  const arr: string[] = s.split('');
  // 双指针
  let left: number = 0;
  let right: number = s.length - 1;

  while (left < right) {
    // 同时是元音，交换
    if (set.has(arr[left]) && set.has(arr[right])) {
      const temp: string = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
    // 左右判断是否需要前进或者后腿
    if (!set.has(arr[left])) {
      left++;
    }
    if (!set.has(arr[right])) {
      right--;
    }
  }

  return arr.join('');
}

// test
let res = reverseVowels('leetcode');
console.log(res);
