// Find the Exact Value
export function binarySearch(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;

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

// Find Lower bound
export function binarySearch_lowerBound(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;

    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left >= 0 && nums[left - 1] === target) {
    return left - 1;
  }

  return -1;
}

// Find Upper bound
export function binarySearch_upperBound(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;

    if (nums[mid] >= target) {
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

// test
const res1 = binarySearch([-1, 0, 3, 5, 9, 12], 9);
console.log(res1);

// test
const res2 = binarySearch_lowerBound([-1, 0, 3, 5, 9, 12], 9);
console.log(res2);

const res3 = binarySearch_upperBound([-1, 0, 3, 5, 9, 12], 9);
console.log(res3);
