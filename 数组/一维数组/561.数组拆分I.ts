// 561 数组拆分 I

/*
 * 给定长度为 2n 的整数数组 nums
 * 你的任务是将这些数分成 n 对
 * 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从 1 到 n 的 min(ai, bi) 总和最大
 * 返回该 最大总和
 */

export function arrayPairSum(nums: number[]): number {
  let sum: number = 0;
  nums = nums.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i < nums.length; i += 2) {
    sum += nums[i];
  }
  return sum;
}

// test
let res = arrayPairSum([6, 2, 6, 5, 1, 2]);
console.log(res);
