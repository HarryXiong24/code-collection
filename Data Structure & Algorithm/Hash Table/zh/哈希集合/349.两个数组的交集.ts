// 349 两个数组的交集

/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 示例 1：
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 */

export function intersection(nums1: number[], nums2: number[]): number[] {
  let set1: Set<number> = new Set<number>(nums1);
  let intersection: Set<number> = new Set<number>();

  nums2.forEach((item) => {
    if (set1.has(item)) {
      intersection.add(item);
    }
  });

  return [...intersection];
}

// test
const res = intersection([1, 2, 2, 1], [2, 2]);
console.log(res);
