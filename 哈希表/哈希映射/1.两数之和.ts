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

// 哈希映射解法
export function twoSum(nums: number[], target: number): number[] {
  let map: Map<number, number> = new Map();
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    const diff: number = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff)!, i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
}

// test
let res: number[] = twoSum([2, 7, 11, 15], 9);
console.log(res);
