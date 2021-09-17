// 485 最大连续 1 的个数

/*
 * 给定一个二进制数组, 计算其中最大连续 1 的个数
 * 示例
 * 输入：[1,1,0,1,1,1]
 * 输出：3
 * 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
 */

// 双指针解法
export function findMaxConsecutiveOnes(nums: number[]): number {
  let slow: number = 0;
  let fast: number = 0;
  let count: number = 0;
  let max: number = 0;

  // 数组为空直接返回
  if (nums.length === 0) {
    return 0;
  }

  // 慢指针
  for (slow = 0; slow < nums.length; slow++) {
    if (nums[slow] === 1) {
      // 每次初始化
      fast = slow;
      count = 0;
      // fast 为 1 的时候，计数且 fast 指针 +1
      while (fast < nums.length && nums[fast] === 1) {
        count++;
        fast++;
      }
      // 取每次的最大值
      if (max < count) {
        max = count;
      }
    }
  }

  return max;
}

// 一次遍历
export function findMaxConsecutiveOnes2(nums: number[]): number {
  let count: number = 0;
  let max: number = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      count++;
      if (max < count) {
        max = count;
      }
    } else {
      count = 0;
    }
  }

  return max;
}

// test
let res = findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]);
let res2 = findMaxConsecutiveOnes2([1, 1, 0, 1, 1, 1]);
console.log(res);
console.log(res2);
