// 希尔排序

/**
 * 希尔排序可以看作是一个冒泡排序或者插入排序的变形
 * 希尔排序在每次的排序的时候都把数组拆分成若干个序列
 * 一个序列的相邻的元素索引相隔的固定的距离gap，
 * 每一轮对这些序列进行冒泡或者插入排序，然后再缩小gap得到新的序列一一排序，直到gap为1
 *
 * 比如对于数组[5,2,4,3,1,2]
 * 第一轮gap=3拆分成[5,3]、[2,1]和[4,2]三个数组进行插入排序得到[3,1,2,5,2,4]
 * 第二轮gap=2，拆分成[3,2,2]和[1,5,4]进行插入排序得到[2,1,2,4,3,5]
 * 最后gap=1，全局插入排序得到[1,2,2,3,4,5]
 *
 * 平均时间复杂度 O(nlogn)，空间复杂度 O(l)
 */

export function shellSort(nums: number[]): number[] {
  let gap = Math.floor(nums.length / 2);
  while (gap > 0) {
    for (let i = 0; i < gap; i++) {
      // 对每个子序列进行排序
      for (let j = i + gap; j < nums.length; j += gap) {
        // 插入排序的部分
        let temp = j;
        while (temp > i && nums[temp] < nums[temp - gap]) {
          swap(nums, temp, temp - gap);
          temp -= gap;
        }
      }
    }
    gap = Math.floor(gap / 2);
  }
  return nums;
}

function swap(nums: number[], i: number, j: number) {
  let temp: number = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

// test
const res = shellSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
