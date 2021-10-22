// 350 两个数组的交集 II

/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 示例 1：
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 * 示例 2:
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[4,9]
 */

export function intersect(nums1: number[], nums2: number[]): number[] {
  let map: Map<number, number> = new Map<number, number>();
  let result: number[] = [];
  for (let i = 0; i < nums1.length; i++) {
    if (map.has(nums1[i])) {
      map.set(nums1[i], map.get(nums1[i])! + 1);
    } else {
      map.set(nums1[i], 1);
    }
  }

  for (let i = 0; i < nums2.length; i++) {
    if (map.has(nums2[i]) && map.get(nums2[i]) !== 0) {
      result.push(nums2[i]);
      map.set(nums2[i], map.get(nums2[i])! - 1);
    }
  }

  return result;
}

// test
const res = intersect([4, 9, 5], [9, 4, 9, 8, 4]);
console.log(res);
