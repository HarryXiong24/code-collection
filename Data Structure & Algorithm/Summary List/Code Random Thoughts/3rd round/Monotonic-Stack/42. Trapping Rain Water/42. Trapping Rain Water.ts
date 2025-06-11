// 42. Trapping Rain Water

import { connect } from '../../../1st round/Tree/Level Order/116. Populating Next Right Pointers in Each Node/116. Populating Next Right Pointers in Each Node';

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
  let sum = 0;

  if (height.length === 0) {
    return sum;
  }

  stack.push(0);

  for (let i = 1; i < height.length; i++) {
    if (height[stack[stack.length - 1]] >= height[i]) {
      stack.push(i);
    } else {
      while (stack.length && height[stack[stack.length - 1]] < height[i]) {
        const mid = stack.pop()!;

        if (stack.length) {
          const right = i;
          const left = stack[stack.length - 1];

          const w = right - left - 1;
          const h = Math.min(height[left], height[right]) - height[mid];

          sum += h * w;
        }
      }
      stack.push(i);
    }
  }

  return sum;
}

export function trapTwoPoints(height: number[]): number {
  let sum = 0;

  for (let i = 0; i < height.length; i++) {
    if (i === 0 || i === height.length - 1) {
      continue;
    }

    let leftHeight = height[i - 1];
    let rightHeight = height[i + 1];

    for (let left = i - 1; left >= 0; left--) {
      if (height[left] > leftHeight) {
        leftHeight = height[left];
      }
    }

    for (let right = i + 1; right < height.length; right++) {
      if (height[right] > rightHeight) {
        rightHeight = height[right];
      }
    }

    const h = Math.min(leftHeight, rightHeight) - height[i];

    if (h > 0) {
      sum += h;
    }
  }

  return sum;
}

// test
const res = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
console.log(res);
