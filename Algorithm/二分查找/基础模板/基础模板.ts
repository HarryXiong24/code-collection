export function binarySearch(nums: number[], target: number): number {
  if (nums.length == 0) {
    return -1;
  }

  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  //  End Condition: left > right
  return -1;
}
