// 202 快乐数

/**
 * 编写一个算法来判断一个数 n 是不是快乐数。
 *「快乐数」定义为：
 * 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * 如果 可以变为  1，那么这个数就是快乐数。
 * 如果 n 是快乐数就返回 true ；不是，则返回 false 。
 */

/**
 * 理解该题的重点在于，该题的遍历过程只会形成两种形式的数据：
 * 1.链式数据
 * 2.环形数据
 * 于是，该问题的遍历过程可被还原为在链上寻找是否有环，无环则是快乐数，有环则不是快乐书。
 */
export function isHappy(n: number): boolean {
  let result: number = n;
  let cache: Set<number> = new Set([]);

  let cycle = (n: number): any => {
    let sum: number = 0;
    let len = String(n).length;
    for (let i = 0; i < len; i++) {
      sum += (n % 10) ** 2;
      n = (n - (n % 10)) / 10;
    }
    return sum;
  };

  while (result !== 1) {
    result = cycle(result);
    if (cache.has(result)) {
      return false;
    }
    cache.add(result);
  }
  return true;
}

// test
const res = isHappy(19);
console.log(res);
