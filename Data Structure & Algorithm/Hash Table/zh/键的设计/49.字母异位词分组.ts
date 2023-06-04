// 49 字母异位词分组

/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母都恰好只用一次。
 * 示例 1:
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

/**
 * 思路：
 * 我们的映射策略可以是：对字符串进行排序并使用排序后的字符串作为键
 * 也就是说，“eat” 和 “ate” 都将映射到 “aet”。
 */
export function groupAnagrams(strs: string[]): string[][] {
  // 设置集合
  const map: Map<string, string[]> = new Map();
  for (let i = 0; i < strs.length; i++) {
    // 确定键，进行排序处理
    const str = sortStr(strs[i]);
    if (map.has(str)) {
      // 如果该键之前存在，则取出值，添加后在 set 回去
      let arr: string[] = map.get(str)!;
      arr.push(strs[i]);
      map.set(str, arr);
    } else {
      // 如果该键不存在，直接构造后 set
      let arr: string[] = [strs[i]];
      map.set(str, arr);
    }
  }

  const result: string[][] = [];
  for (let value of map.values()) {
    result.push(value);
  }
  return result;
}

function sortStr(s: string): string {
  const arr = s.split('').sort();
  return arr.join('');
}

// test
const res = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
console.log(res);
