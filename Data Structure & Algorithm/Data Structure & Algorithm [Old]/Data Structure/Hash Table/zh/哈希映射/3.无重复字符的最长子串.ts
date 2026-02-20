// 3 无重复字符的最长子串

/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 示例 1:
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */

export function lengthOfLongestSubstring(s: string): number {
  let map: Map<string, number> = new Map<string, number>();
  // 指示当前轮次的最大长度
  let maxLen = 0;
  // 指示当先字符串遍历的位置
  let index = 0;

  // 长度为1直接返回
  if (s.length === 1) {
    return 1;
  }

  for (let k = 0; k < s.length; k++) {
    // 内层循环，map 把每次不相同的字符存起来，如果找到相同的键，则退出内层循环
    for (let i = index; i < s.length; i++) {
      if (map.has(s.charAt(i))) {
        break;
      }
      map.set(s.charAt(i), i);
    }
    index++;
    // 这一轮中最大的长度
    maxLen = map.size > maxLen ? map.size : maxLen;
    // 清空 map，进行下一轮
    map.clear();
  }
  return maxLen;
}

// test
const res = lengthOfLongestSubstring('abcabcbb');
console.log(res);
