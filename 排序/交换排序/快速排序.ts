// 快速排序

/*
 * 思路：选取一个基准，通常是第一个数或者最后一个数
 * 通过一趟扫描把待排序列分成两部分，左边的比基准小，右边的比基准大
 * 此时基准就位于正中间，也就是正确的位置，然后再用同样的方法递归左右两部分
 * 平均时间复杂度 O(nlogn)，空间复杂度 O(logn)
 */

function quick(nums: number[]): number[] {
  // begin 表示第一个数的序号，end表示最后一个数的序号
  function sort(begin: number, end: number) {
    let i: number = begin;
    let j: number = end;
    // flag表示基准
    let flag = nums[begin];
    if (begin < end) {
      while (i < j) {
        // 从后开始向前扫描，找到比基准小的数，放到list[i]
        for (; i < j; j--) {
          if (nums[j] < flag) {
            nums[i++] = nums[j];
            break;
          }
        }
        // 再从前向后扫描，找到比基准大的数，放到list[j]
        for (; i < j; i++) {
          if (nums[i] > flag) {
            nums[j--] = nums[i];
            break;
          }
        }
      }
      // 最后i，j相同，所指向的位置就是flag的正确位置
      nums[i] = flag;
      sort(0, i - 1);
      sort(i + 1, end);
    }
  }
  sort(0, nums.length - 1);
  return nums;
}
