// 快速排序

/**
 * 思路：
 * 选择数组中间数作为基数，并从数组中取出此基数
 * 准备两个数组容器，遍历数组，逐个与基数比对，较小的放左边容器，较大的放右边容器
 * 递归处理两个容器的元素，并将处理后的数据与基数按大小合并成一个数组，返回
 * 平均时间复杂度 O(nlogn)，空间复杂度 O(logn)
 */

export function quickSort(nums: number[]): number[] {
  // begin表示第一个数的序号，end表示最后一个数的序号
  const sort = (begin: number, end: number) => {
    let i: number = begin;
    let j: number = end;
    // flag表示基准
    let flag: number = nums[begin];
    if (begin < end) {
      while (i < j) {
        // 从后开始向前扫描，找到比基准小的数，放到nums[i]
        for (; i < j; j--) {
          if (nums[j] < flag) {
            nums[i++] = nums[j];
            break;
          }
        }
        // 再从前向后扫描，找到比基准大的数，放到nums[j]
        for (; i < j; i++) {
          if (nums[i] > flag) {
            nums[j--] = nums[i];
            break;
          }
        }
      }
      // 最后i，j相同，所指向的位置就是flag的正确位置
      nums[i] = flag;
      // 递归
      sort(0, i - 1);
      sort(i + 1, end);
    }
  };
  sort(0, nums.length - 1);
  return nums;
}

// test
const res = quickSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
