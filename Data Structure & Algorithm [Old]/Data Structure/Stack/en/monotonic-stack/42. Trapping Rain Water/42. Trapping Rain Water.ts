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
  const stack: number[] = [];
  stack.push(0);
  let result: number = 0;

  for (let i = 1; i < height.length; i++) {
    let top = stack[stack.length - 1];
    if (height[top] > height[i]) {
      stack.push(i);
    } else if (height[top] === height[i]) {
      stack.pop();
      stack.push(i);
    } else {
      while (stack.length && height[top] < height[i]) {
        const mid = stack.pop()!;
        if (stack.length > 0) {
          const left = stack[stack.length - 1];
          const h = Math.min(height[left], height[i]) - height[mid];
          const w = i - left - 1;
          result += h * w;
          top = stack[stack.length - 1];
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
