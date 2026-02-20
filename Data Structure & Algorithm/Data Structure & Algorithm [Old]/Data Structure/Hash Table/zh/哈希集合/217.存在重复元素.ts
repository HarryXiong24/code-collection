// 217 存在重复元素

/**
 * 给定一个整数数组，判断是否存在重复元素。
 * 如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
 */

// 使用哈希表解决
export function containsDuplicate(nums: number[]): boolean {
  let set: Set<number> = new Set<number>();
  for (let i of nums) {
    if (set.has(i)) {
      return true;
    }
    set.add(i);
  }
  return false;
}

// test
const res = containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);
console.log(res);
