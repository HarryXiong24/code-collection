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
  const monotonic_stack: number[] = [];
  let result: number = 0;
  monotonic_stack.push(0);
  heights.push(0);

  for (let i = 1; i < heights.length; i++) {
    if (heights[monotonic_stack[monotonic_stack.length - 1]] < heights[i]) {
      monotonic_stack.push(i);
    } else if (heights[monotonic_stack[monotonic_stack.length - 1]] === heights[i]) {
      monotonic_stack.pop()!;
      monotonic_stack.push(i);
    } else {
      while (monotonic_stack.length && heights[monotonic_stack[monotonic_stack.length - 1]] > heights[i]) {
        const mid = monotonic_stack.pop()!;
        const left = monotonic_stack.length > 0 ? monotonic_stack[monotonic_stack.length - 1] : -1;
        const w = i - left - 1;
        const h = heights[mid];
        result = Math.max(result, w * h);
      }
      monotonic_stack.push(i);
    }
  }

  return result;
}

// test
const res = largestRectangleArea([2, 1, 5, 6, 2, 3]);
console.log(res);
