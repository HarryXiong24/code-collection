/**
 * 二分查找的最基础和最基本的形式
 * 用于查找可以通过访问数组中的单个索引来确定的元素或条件。
 *
 * 关键属性
 * 二分查找的最基础和最基本的形式。
 * 查找条件可以在不与元素的两侧进行比较的情况下确定（或使用它周围的特定元素）。
 * 不需要后处理，因为每一步中，你都在检查是否找到了元素。如果到达末尾，则知道未找到该元素。
 */

export function binarySearch(nums: number[], target: number): number {
  if (nums.length == 0) {
    return -1;
  }

  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  //  End Condition: left > right
  return -1;
}
