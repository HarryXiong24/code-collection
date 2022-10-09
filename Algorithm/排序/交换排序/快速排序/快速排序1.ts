// 快速排序

/**
 * 思路：
 * 选择数组中间数作为基数，并从数组中取出此基数
 * 准备两个数组容器，遍历数组，逐个与基数比对，较小的放左边容器，较大的放右边容器
 * 递归处理两个容器的元素，并将处理后的数据与基数按大小合并成一个数组，返回
 * 平均时间复杂度 O(nlogn)，空间复杂度 O(logn)
 */

export function quickSort(nums: number[]): number[] {
  if (nums.length <= 1) {
    return nums;
  }
  let pivotIndex = Math.floor(nums.length / 2);
  let pivot = nums.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  nums.splice(pivotIndex, 0);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// test
const res = quickSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
