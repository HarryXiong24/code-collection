// 136 只出现一次的数字

/*
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 说明：
 * 你的算法应该具有线性时间复杂度。
 */

export function singleNumber(nums: number[]): number {
  const set: Set<number> = new Set();
  for (let i of nums) {
    // 如果存在 i，说明已经放过1次，把它移除；不存在，则放入 set。
    if (set.has(i)) {
      set.delete(i);
    } else {
      set.add(i);
    }
  }
  // 因为最后 set 里只有一个元素了，即那个逢单的元素，所以转成数组返回即可
  return [...set][0];
}

// test
let res = singleNumber([4, 1, 2, 1, 2]);
console.log(res);
