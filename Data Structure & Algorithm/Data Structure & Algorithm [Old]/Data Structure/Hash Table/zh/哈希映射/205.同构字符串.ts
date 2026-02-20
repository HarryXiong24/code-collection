// 205 同构字符串

/**
 * 给定两个字符串 s 和 t，判断它们是否是同构的。
 * 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
 * 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。
 * 不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
 * 示例 1:
 * 输入：s = "egg", t = "add"
 * 输出：true
 * 示例 2：
 * 输入：s = "foo", t = "bar"
 * 输出：false
 * 示例 3：
 * 输入：s = "paper", t = "title"
 * 输出：true
 */

// 此处是一一映射，所以要建立双向 map 绑定关系
export function isIsomorphic(s: string, t: string): boolean {
  const sTot: Map<string, string> = new Map();
  const tTos: Map<string, string> = new Map();
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    const x = s[i];
    const y = t[i];
    if (
      (sTot.has(x) && sTot.get(x) !== y) ||
      (tTos.has(y) && tTos.get(y) !== x)
    ) {
      return false;
    }
    sTot.set(x, y);
    tTos.set(y, x);
  }
  return true;
}

// test
const res1 = isIsomorphic('foo', 'bar');
const res2 = isIsomorphic('egg', 'add');
const res3 = isIsomorphic('badc', 'baba');
console.log(res1);
console.log(res2);
console.log(res3);
