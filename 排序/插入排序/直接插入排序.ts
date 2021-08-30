// 直接插入排序

/*
 * 思路：
 * 在要排序的数组中，假设前面（n-1）位已经排好序了
 * 然后把第 n 个数插入到前面的有序区中，也就实现了 n 个数排序
 * 如此反复循环，知道数组排序完毕
 * 平均时间复杂度 O(n^2)，空间复杂度 O(1)
 */

export function directInsertSort(nums: number[]): number[] {
  let point: number;
  // 第一次把第一个数当成有序区，这个循环表示轮次数
  for (let i = 1; i < nums.length; i++) {
		// point 用来保存这一轮正在比较的值
    point = nums[i];
    for (let j = i - 1; j >= 0; j--) {
			if (nums[j] > point){
				// nums[j] 比 point 大的，就把 nums[j] 后移一位
				nums[j+1] = nums[j];
				// j === 0 表示这一轮全部比完了
				if (j === 0) {
					nums[j] = point;
				}
			} else {
				// point 比前面都大，所以直接放在原位置，原位置就是当前的 i，也就是 j+1
        nums[j+1] = point;
				break;
			}
		}
  }
  return nums;
}

// test
let res = directInsertSort([10, 1, 3, 2, 9, 1, 5, 6]);
console.log(res);
