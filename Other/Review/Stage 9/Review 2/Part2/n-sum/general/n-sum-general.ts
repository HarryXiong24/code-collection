export function nSum(nums: number[], n: number, start: number, target: number): number[][] {
  const res: number[][] = [];

  if (n < 2 || nums.length < n) {
    return res;
  }

  if (n === 2) {
    let left = start;
    let right = nums.length - 1;

    while (left < right) {
      if (nums[left] + nums[right] < target) {
        left++;
      } else if (nums[left] + nums[right] > target) {
        right--;
      } else {
        res.push([nums[left], nums[right]]);

        while (left < right && nums[left + 1] === nums[left]) {
          left++;
        }

        while (left < right && nums[right - 1] === nums[right]) {
          right--;
        }

        left++;
        right--;
      }
    }
  } else {
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i - 1] === nums[i]) {
        continue;
      }

      const sub = nSum(nums, n - 1, i + 1, target - nums[i]);

      for (const item of sub) {
        res.push([...item, nums[i]]);
      }
    }
  }

  return res;
}

// test
const array = [1, 0, -1, 0, -2, 2];
array.sort((a, b) => a - b);
const res = nSum(array, 4, 0, 0);
console.log(res);
