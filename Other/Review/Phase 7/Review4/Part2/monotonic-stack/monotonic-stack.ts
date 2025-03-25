export function nextGreaterElement(nums: number[]): number[] {
  const result: number[] = new Array(nums.length).fill(-1);
  const monotonicStack: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (monotonicStack.length && nums[monotonicStack[monotonicStack.length - 1]] < nums[i]) {
      const top = monotonicStack.pop()!;
      result[top] = nums[i];
    }
    monotonicStack.push(i);
  }

  return result;
}

// test
const nums = [2, 1, 2, 4, 3];
console.log(nextGreaterElement(nums)); // [4, 2, 4, -1, -1]
