// 35 搜索插入位置

/*
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 * 请必须使用时间复杂度为 O(log n) 的算法
 */

export function searchInsert(nums: number[], target: number): number {

  // 开始位置
  if (target < nums[0]) {
    return 0;
  }

  // 结束位置
  if (target > nums[nums.length - 1]) {
    return nums.length;
  }

  // 中间情况
  for(let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    } 
    
    if (nums[i+1] === target) {
      return i+1;
    }

    if (target > nums[i] && target < nums[i+1]) {
      return i+1;
    }
  }

  return -1;
};

// test
let res1 = searchInsert([1,3,5,6], 2);
let res2 = searchInsert([1,3,5,6], 7);
let res3 = searchInsert([1,3,5,6], 0);
let res4 = searchInsert([1], 0);
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);

