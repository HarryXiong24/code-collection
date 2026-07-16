// 15. Decode Variations

// A letter can be encoded to a number in the following way:

// 'A' -> '1', 'B' -> '2', 'C' -> '3', ..., 'Z' -> '26'
// A message is a string of uppercase letters, and it is encoded first using this scheme. For example, 'AZB' -> '1262'

// Given a string of digits S from 0-9 representing an encoded message, return the number of ways to decode it.

// Examples:
// input:  S = '1262'
// output: 3
// explanation: There are 3 messages that encode to '1262': 'AZB', 'ABFB', and 'LFB'.

/**
	@param S: string
	@return: integer
	*/
export function decodeVariations(S: string) {
  if (S.length === 0) {
    return 0;
  }

  let pre = 27; // 上一个数字，初始值为一个不可能的数字（27）
  let cur = 0; // 当前解码方式的数量

  let first = 1; // 表示当前字符的解码方式数量
  let second = 1; // 表示当前字符和下一个字符的解码方式数量

  for (let i = S.length - 1; i >= 0; i--) {
    let d = parseInt(S[i], 10);

    if (d === 0) {
      // 如果当前数字为 0，无法单独解码（因为没有映射到 'A' 到 'Z' 的编码）
      cur = 0;
    } else {
      cur = first; // 将 first 的值赋给 cur（单独解码当前数字的方式）
      // If combining d with pre forms a valid two-digit number between 10 and 26
      if (d * 10 + pre < 27) {
        cur += second;
      }
    }

    pre = d; // 更新 pre 为当前数字，为下一次循环判断提供基础
    [first, second] = [cur, first];
  }

  return cur;
}

export function decodeVariationsDP(S: string) {
  const n = S.length;
  if (n === 0) {
    return 0; // 空字符串无解码方式
  }

  const dp = new Array(n + 1).fill(0);
  dp[n] = 1; // 空字符串解码方式为1

  for (let i = n - 1; i >= 0; i--) {
    if (S[i] !== '0') {
      dp[i] = dp[i + 1]; // 单独解码当前数字

      // 检查两位数是否有效
      if (i < n - 1) {
        const twoDigit = parseInt(S.substring(i, i + 2), 10);
        if (twoDigit >= 10 && twoDigit <= 26) {
          dp[i] += dp[i + 2];
        }
      }
    }
  }

  return dp[0]; // 返回整个字符串的解码方式
}

// test
const res = decodeVariations('1262');
console.log(res);
