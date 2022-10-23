// 34 在排序数组中查找元素的第一个和最后一个位置

/**
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
 * 找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 进阶：你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 */

export function searchRange(nums: number[], target: number): number[] {
  if (nums.length === 0) {
    return [-1, -1];
  }
  let left = 0;
  let right = nums.length - 1;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid;
    } else if (nums[mid] > target) {
      right = mid;
    } else {
      let l = mid;
      let r = mid;
      while (l >= 0 && target === nums[l]) {
        l--;
        continue;
      }
      while (r < nums.length && target === nums[r]) {
        r++;
        continue;
      }
      return [l + 1, r - 1];
    }
  }

  if (target == nums[left] && target == nums[right]) {
    return [left, right];
  }
  if (target == nums[left]) {
    return [left, left];
  }
  if (target == nums[right]) {
    return [right, right];
  }
  return [-1, -1];
}

// test
const res = searchRange([5, 7, 7, 8, 8, 10], 8);
console.log(res);
