// 34 在排序数组中查找元素的第一个和最后一个位置

/*
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
 * 找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 进阶：你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 */

// 本题可以拆解为寻找左侧、右侧边界的二分搜索
export function searchRange(nums: number[], target: number): number[] {
  let left: number = searchBound(nums, target, true);
  let right: number = searchBound(nums, target, false);
  return [left, right];
};

export function searchBound(nums: number[], target: number, isLeft: boolean): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  let result = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      result = mid;
      if (isLeft) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return result;
}

// test
let res = searchRange([5, 7, 7, 8, 8, 10], 8);
console.log(res);
