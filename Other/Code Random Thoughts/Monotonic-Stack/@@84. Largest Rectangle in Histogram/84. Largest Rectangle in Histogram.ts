// 84. Largest Rectangle in Histogram

// Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

// Example 1:
// Input: heights = [2,1,5,6,2,3]
// Output: 10
// Explanation: The above is a histogram where width of each bar is 1.
// The largest rectangle is shown in the red area, which has an area = 10 units.

// Example 2:
// Input: heights = [2,4]
// Output: 4

export function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  heights.push(0);
  stack.push(0);
  let result: number = 0;

  for (let i = 1; i < heights.length; i++) {
    let top = stack[stack.length - 1];
    if (heights[top] <= heights[i]) {
      stack.push(i);
    } else {
      while (stack.length > 0 && heights[top] > heights[i]) {
        const mid = stack.pop()!;
        const left = stack.length > 0 ? stack[stack.length - 1] : -1;
        const w = i - left - 1;
        const h = heights[mid];
        result = Math.max(result, w * h);
        top = stack[stack.length - 1];
      }
      stack.push(i);
    }
  }
  return result;
}

// test
const res = largestRectangleArea([2, 1, 5, 6, 2, 3]);
console.log(res);
