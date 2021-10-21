// 387 字符串中的第一个唯一字符

/* 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 示例：
 * s = "leetcode"
 * 返回 0
 * s = "loveleetcode"
 * 返回 2
 */

/*
 * 队列法
 * 我们也可以借助队列找到第一个不重复的字符。队列具有「先进先出」的性质，因此很适合用来找出第一个满足某个条件的元素。
 * 具体地，我们使用与方法二相同的哈希映射，并且使用一个额外的队列，按照顺序存储每一个字符以及它们第一次出现的位置。当我们对字符串进行遍历时，设当前遍历到的字符为 cc，如果 cc 不在哈希映射中，我们就将 cc 与它的索引作为一个二元组放入队尾，否则我们就需要检查队列中的元素是否都满足「只出现一次」的要求，即我们不断地根据哈希映射中存储的值（是否为 -1−1）选择弹出队首的元素，直到队首元素「真的」只出现了一次或者队列为空。
 * 在遍历完成后，如果队列为空，说明没有不重复的字符，返回 -1−1，否则队首的元素即为第一个不重复的字符以及其索引的二元组。
 */
export function firstUniqChar(s: string): number {
  const position: Map<string, number> = new Map();
  const q: Array<[string, number]> = [];
  for (let [i, ch] of Array.from(s).entries()) {
    if (!position.has(ch)) {
      position.set(ch, i);
      q.push([s[i], i]);
    } else {
      position.set(ch, -1);
      while (q.length && position.get(q[0][0]) === -1) {
        q.shift();
      }
    }
  }
  return q.length ? q[0][1] : -1;
}

// test
let res = firstUniqChar('loveleetcode');
console.log(res);
