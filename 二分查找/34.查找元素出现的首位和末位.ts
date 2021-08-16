// 34 在排序数组中查找元素的第一个和最后一个位置

/*
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
 * 找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 进阶：你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 */

function searchRange(nums: number[], target: number): number[] {
  let left: number = 0;
  let right: number = nums.length - 1;
  let res: number[] = [];
  while (left <= right) {
    let mid: number = Math.floor((left + right) / 2);
    if(nums[mid] === target) {
      res.push(mid);
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if(nums[mid] < target) {
      left = mid + 1;
    }
  }
  console.log(res);
  if (res === []) {
    return [-1, -1];
  } else {
    res = res.sort((a: number, b: number) => {
      return a - b;
    });
    return [res[0], res[res.length-1]];
  }
};

// test
let res = searchRange([5,7,7,8,8,10], 8);
console.log(res);
