// 42. Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

export function trap(height: number[]): number {
  let result: number = 0;
  const stack: number[] = [];

  stack.push(0);

  for (let i = 1; i < height.length; i++) {
    if (height[stack[stack.length - 1]] >= height[i]) {
      stack.push(i);
    } else {
      while (stack.length && height[stack[stack.length - 1]] < height[i]) {
        const mid = stack.pop()!;

        if (stack.length) {
          const left = stack[stack.length - 1];
          const right = i;

          const h = Math.min(height[left], height[right]) - height[mid];
          const w = right - left - 1;

          result += h * w;
        }
      }
      stack.push(i);
    }
  }

  return result;
}

// test
const res = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
console.log(res);
