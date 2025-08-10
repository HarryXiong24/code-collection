// Find a range
export function binarySearch(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid;
    } else if (nums[mid] > target) {
      right = mid;
    } else {
      return mid;
    }
  }

  // End Condition: left + 1 == right
  if (nums[left] === target) {
    return left;
  }
  if (nums[right] === target) {
    return right;
  }
  return -1;
}

// test
const res = binarySearch([-1, 0, 3, 5, 9, 12], 12);
console.log(res);
