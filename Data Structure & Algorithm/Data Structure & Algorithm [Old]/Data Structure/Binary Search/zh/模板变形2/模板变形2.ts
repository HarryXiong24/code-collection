/**
 * 二分查找的另一种独特形式
 * 它用于搜索需要访问当前索引及其在数组中的直接左右邻居索引的元素或条件。
 *
 * 关键属性
 * 实现二分查找的另一种方法。
 * 搜索条件需要访问元素的直接左右邻居。
 * 使用元素的邻居来确定它是向右还是向左。
 * 保证查找空间在每个步骤中至少有 3 个元素。
 * 需要进行后处理。 当剩下 2 个元素时，循环 / 递归结束。 需要评估其余元素是否符合条件。
 */

function binarySearch(nums: number[], target: number): number {
  if (nums.length === 0) {
    return -1;
  }

  let left = 0;
  let right = nums.length - 1;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }

  // Post-processing:
  // End Condition: left + 1 == right
  if (nums[left] == target) {
    return left;
  }
  if (nums[right] == target) {
    return right;
  }
  return -1;
}
