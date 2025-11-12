// Find the Exact Value
export function binarySearch(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}

// first occurrence (leftmost), First index where value == target
export function binarySearch_leftmost(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (target <= nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (right < nums.length - 1 && nums[right + 1] === target) {
    return right + 1;
  }

  return -1;
}

// last occurrence (rightmost), Last index where value == target
export function binarySearch_rightmost(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (target >= nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left > 0 && nums[left - 1] === target) {
    return left - 1;
  }

  return -1;
}

// test
const res1 = binarySearch([-1, 0, 3, 5, 9, 12], 9);
console.log(res1);

// test
const res2 = binarySearch_leftmost([-1, 0, 3, 5, 9, 12], 9);
console.log(res2);

const res3 = binarySearch_rightmost([-1, 0, 3, 5, 9, 12], 9);
console.log(res3);

// count= rightmost − leftmost + 1
const count = res2 === -1 ? 0 : res3 - res2 + 1;
console.log(count);
