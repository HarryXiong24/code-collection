// Find the Exact Value
export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

// Find Upper bound
export function search1(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left > 0 && nums[left - 1] === target) {
    return left - 1;
  } else {
    return -1;
  }
}

// Find Lower bound
export function search2(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (right < nums.length - 1 && nums[right + 1] === target) {
    return right + 1;
  } else {
    return -1;
  }
}

// test
const res = search([5], 9);
const res1 = search1([5], 9);
const res2 = search2([5], 9);
console.log(res);
console.log(res1);
console.log(res2);
