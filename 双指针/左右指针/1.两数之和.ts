// 1 两数之和

/*
 * 给定一个整数数组 nums 和一个整数目标值 target
 * 请你在该数组中找出 和为目标值 target 的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 */

export function twoSum(nums: number[], target: number): number[] {
  let left: number = 0;
  let right: number = left + 1;
  while (left !== nums.length) {
    while (right !== nums.length) {
      if (nums[left] + nums[right] === target) {
        return [left, right];
      }
      right++;
    }
    left++;
    right = left + 1;
  }
  return [];
};

// test 
let res: number[] = twoSum([2,7,11,15], 9);
console.log(res);
