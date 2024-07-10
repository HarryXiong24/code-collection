// Find Upper bound
export function binarySearch(nums: number[], target: number): number {
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
  }
  return -1;
}

// test
const res = binarySearch([-1, 0, 3, 5, 9, 12], 9);
console.log(res);
