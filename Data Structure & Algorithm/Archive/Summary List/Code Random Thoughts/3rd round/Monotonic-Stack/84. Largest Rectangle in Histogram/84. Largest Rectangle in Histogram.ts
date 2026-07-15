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

export function largestRectangleAreaTwoPoints(heights: number[]): number {
  let square = 0;

  if (heights.length === 0) {
    return square;
  }

  for (let i = 0; i < heights.length; i++) {
    let left = i;
    let right = i;

    for (let j = left; j >= 0; j--) {
      if (heights[j] < heights[left]) {
        left = j;
        break;
      }
    }

    for (let j = right; j < heights.length; j++) {
      if (heights[j] < heights[right]) {
        right = j;
        break;
      }
    }

    const w = right - left - 1;
    const h = heights[i];
    square = Math.max(square, w * h);
  }

  return square;
}

export function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let square = 0;

  if (heights.length === 0) {
    return square;
  }

  heights.push(0);
  stack.push(0);

  for (let i = 1; i < heights.length; i++) {
    if (heights[stack[stack.length - 1]] <= heights[i]) {
      stack.push(i);
    } else {
      while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
        const mid = stack.pop()!;

        const left = stack.length > 0 ? stack[stack.length - 1] : -1;
        const right = i;

        const w = right - left - 1;
        const h = heights[mid];

        square = Math.max(square, w * h);
      }

      stack.push(i);
    }
  }

  return square;
}

// test
const res = largestRectangleAreaTwoPoints([2, 1, 5, 6, 2, 3]);
console.log(res);
