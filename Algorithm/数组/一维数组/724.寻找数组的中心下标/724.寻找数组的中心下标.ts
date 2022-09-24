// 724 寻找数组的中心下标

/**
 * 给你一个整数数组 nums ，请计算数组的中心下标
 * 数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。
 * 如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素
 * 这一点对于中心下标位于数组最右端同样适用
 * 如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1
 */

// 规律，2 * leftSum + result = sum
export function pivotIndex(nums: number[]): number {
  let sum: number = 0;
  for (let item of nums) {
    sum += item;
  }
  let leftSum: number = 0;
  for (let i = 0; i < nums.length; i++) {
    // 第一轮可以解决类似 [2, 1, -1] 的情况
    if (2 * leftSum + nums[i] === sum) {
      return i;
    }
    leftSum += nums[i];
  }
  return -1;
}

// test
const res = pivotIndex([1, 7, 3, 6, 5, 6]);
console.log(res);
