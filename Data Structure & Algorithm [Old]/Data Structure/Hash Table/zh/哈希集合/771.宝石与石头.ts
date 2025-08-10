// 771 宝石与石头

/**
 * 给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。
 * S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
 * J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
 *
 * 示例 1:
 * 输入: J = "aA", S = "aAAbbbb"
 * 输出: 3
 *
 * 示例 2:
 * 输入: J = "z", S = "ZZ"
 * 输出: 0
 *
 * 注意:
 * S 和 J 最多含有50个字母。
 * J 中的字符不重复。
 */

export function numJewelsInStones(jewels: string, stones: string): number {
  const set: Set<String> = new Set(jewels);
  let count: number = 0;
  for (let i of stones) {
    if (set.has(i)) {
      count++;
    }
  }
  return count;
}

console.log(res);
