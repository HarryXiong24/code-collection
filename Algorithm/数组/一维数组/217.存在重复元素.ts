// 217 存在重复元素

/**
 * 给定一个整数数组，判断是否存在重复元素。
 * 如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
 */

// 使用排序解决
export function containsDuplicate(nums: number[]): boolean {
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      return true;
    }
  }
  return false;
}

// test
const res = containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);
console.log(res);
