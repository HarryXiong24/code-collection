// 27 移除元素

/*
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素
 */

// 这题其实用内置函数更好写，但是特意没有使用。
export function removeElement(nums: number[], val: number): number {
  let count: number = 0;
  let left: number = 0;
  let right: number = nums.length - 1;

  // 初始情况，直接返回
  if (nums.length === 0) {
    return 0;
  }

  // 双指针
  while (left !== right && left < right) {
    // 从左到右，左边出现相同时
    if (nums[left] === val) {
      // 右边也相同，right 退一位，否则满足条件，可以交换一下
      if (nums[right] === val) {
        right--;
      } else {
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
        count++;
      }
    } else {
      // 左边与 val 不相同，直接 +1
      count++;
      left++;
    }
  }

  // 当 left = right 时退出循环，但还要再判断一次
  if (nums[left] === nums[right] && nums[left] !== val) {
    count++;
  }

  console.log(nums); // 查看结果
  return count;
}

// test
let res1 = removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
let res2 = removeElement([3, 2, 2, 3], 3);
let res3 = removeElement([4, 5], 4);
console.log(res1);
console.log(res2);
console.log(res3);
