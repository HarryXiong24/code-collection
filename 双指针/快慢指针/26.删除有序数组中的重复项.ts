// 26 删除有序数组中的重复项

/**
 * 给你一个有序数组 nums，请你原地删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成
 */

// 采用快慢指正
export function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  let slow: number = 1;
  let fast: number = 1;
  while (fast < nums.length) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
}

// test
const res = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
console.log(res);
