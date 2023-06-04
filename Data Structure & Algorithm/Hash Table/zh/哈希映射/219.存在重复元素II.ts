// 219 存在重复元素 II

/**
 * 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j
 * 使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k
 * 示例 1:
 * 输入: nums = [1,2,3,1], k = 3
 * 输出: true
 * 示例 2:
 * 输入: nums = [1,0,1,1], k = 1
 * 输出: true
 * 示例 3:
 * 输入: nums = [1,2,3,1,2,3], k = 2
 * 输出: false
 */

/**
 *
 * 遍历数组，对于每个元素做以下操作：
 * 在散列表中搜索当前元素，如果找到了就返回 true。
 * 在散列表中插入当前元素。
 * 如果当前散列表的大小超过了 kk， 删除散列表中最旧的元素。
 */
export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  let map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return true;
    }
    map.set(nums[i], i);
    if (map.size > k) {
      map.delete(nums[i - k]);
    }
  }
  return false;
}

// test
const res = containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
console.log(res);
