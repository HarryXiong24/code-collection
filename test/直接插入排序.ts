// 直接插入排序

/*
 * 思路：
 * 在要排序的数组中，假设前面（n-1）位已经排好序了
 * 然后把第 n 个数插入到前面的有序区中，也就实现了 n 个数排序
 * 如此反复循环，知道数组排序完毕
 * 平均时间复杂度 O(n^2)，空间复杂度 O(1)
 */

function insertSort(nums: number[]): number[] {
  let point: number;
  // 第一个不需要排序，表示轮次数
  for (let i = 1; i < nums.length; i++) {
    point = nums[i];
    for (let j = i - 1; j >= 0; j--) {
      if (point < nums[j]) {
        nums[j+1] = nums[j];
        if (j === 0) {
          nums[j] = point;
        }
      } else {
        nums[j+1] = point;
        break;
      }
    }
  }
  return nums;
}

// test
let res = insertSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);