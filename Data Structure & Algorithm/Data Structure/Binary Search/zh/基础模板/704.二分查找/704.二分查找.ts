// 704 二分查找

/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target。
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * 输入: nums = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 * 解释: 9 出现在 nums 中并且下标为 4
 */

export function search(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left <= right) {
    const middle: number = Math.floor((left + right) / 2);
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else if (nums[middle] > target) {
      right = middle - 1;
    }
  }
  return -1;
}

// test
const res = search([-1, 0, 3, 5, 9, 12], 9);
console.log(res);
