// 归并排序

/*
 * 思路：
 * 将两个或两个以上的有序表合并成一个新的有序表
 * 即把待排序列分成若干个子序列，每个子序列都是有序的
 * 然后再把有序的子序列合并成整体有序序列
 * 平均时间复杂度 O(nlogn)，空间复杂度 O(n)
 */

function merge(left: number[], right: number[]): number[] {
  var result: number[] = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }
  result = result.concat(left, right);
  return result;
}

// 对数组进行拆分
export function mergeSort(nums: number[]): number[] {
  // 当数组只有一个元素的时候就返回该数组
  if (nums.length == 1) {
    return nums;
  }
  // 否则把数组分成左右两部分
  let middle: number = Math.floor(nums.length / 2);
  let left: number[] = nums.slice(0, middle);
  let right: number[] = nums.slice(middle);
  // 对左右两边进行拆分后进行归并排序
  return merge(mergeSort(left), mergeSort(right));
}
