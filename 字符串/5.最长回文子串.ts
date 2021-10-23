// 5 最长回文子串

/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 分析例子，得出三种情况：
 * 1.非正常情况，长度小于2，直接返回
 * 2.得出结果长度为奇数
 * 3.得出结果长度为偶数
 * 当为奇数时，需要找到这个中心点，中心点向两边扩散都是一一对应相等的，如：aba，cabac
 * 当为偶数时，需要找到这两个中心点，两个中心点向两边扩散也都是一一对应相等的，如：abba，cabbac
 */

export function longestPalindrome(s: string): string {
  // 长度小于2，直接是回文，返回
  if (s.length < 2) {
    return s;
  }

  let result: string = '';

  for (let i = 0; i < s.length; i++) {
    // 分别处理奇数偶数情况
    getResult(i, i, s.length);
    getResult(i, i + 1, s.length);
  }

  function getResult(m: number, n: number, length: number) {
    while (m >= 0 && n < length && s[m] == s[n]) {
      m--;
      n++;
    }
    // 此刻循环结束，也是刚刚不满足条件的时候，m 和 n 需要分别向前取一位
    if (n - m - 1 > result.length) {
      result = s.slice(m + 1, n);
    }
  }

  return result;
}

// test
const res = longestPalindrome('cabad');
console.log(res);
