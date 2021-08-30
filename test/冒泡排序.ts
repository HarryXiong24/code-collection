// 冒泡排序

/*
 * 思路：
 * 通过对待排序序列从前向后（从下标较小的元素开始）
 * 依次比较相邻元素的值，若发现逆序则交换
 * 使值较大的元素逐渐从前移向后部，就象水底下的气泡一样逐渐向上冒
 * 平均时间复杂度 O(n^2)，空间复杂度 O(1)
 */

export function bubblingSort(nums: number[]): number[] {
  for (let i = nums.length; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j+1];
        nums[j+1] = temp;
      }
    }
  }
  return nums;
}

// test
let res = bubblingSort([7, 10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
