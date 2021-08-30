// 直接选择排序

/*
 * 思路：
 * 在要排序的数组中，选择最小的数与第一位交换
 * 然后在剩下的数中找出最小的数与第二位交换
 * 如此循环到倒数第二个数与倒数第一个数比较为止
 * 平均时间复杂度 O(n^2)，空间复杂度 O(1)
 */

function chooseSort(nums: number[]): number[] {
  let min: number = 0;
  for (let i = 0; i < nums.length; i++) {
    min = i;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < nums[min]) {
        min = j;
      }
    }
    const temp = nums[i];
    nums[i] = nums[min];
    nums[min] = temp;
  }
  return nums;
}

// test
let res = chooseSort([8, 10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);