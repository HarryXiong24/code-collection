// 27 移除元素

/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素
 */

export function removeElement(nums: number[], val: number): number {
  let count: number = 0;
  let slow: number = 0;
  let fast: number = 0;
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      const temp = nums[fast];
      nums[fast] = nums[slow];
      nums[slow] = temp;
      slow++;
      count++;
    }
    fast++;
  }

  return count;
}

// test
const res1 = removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
const res2 = removeElement([3, 2, 2, 3], 3);
const res3 = removeElement([4, 5], 4);
console.log(res1);
console.log(res2);
console.log(res3);
