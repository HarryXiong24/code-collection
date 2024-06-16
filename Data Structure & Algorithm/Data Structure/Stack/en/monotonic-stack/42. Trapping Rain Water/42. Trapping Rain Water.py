# 42. Trapping Rain Water

# Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

# Example 1:
# Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
# Output: 6
# Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

# Example 2:
# Input: height = [4,2,0,3,2,5]
# Output: 9

from typing import List


class Solution:
    def trap(self, height: List[int]) -> int:
        stack: List[int] = []
        stack.append(0)
        result = 0

        for i in range(1, len(height)):
            top = stack[len(stack) - 1]
            if height[top] > height[i]:
                stack.append(i)
            elif height[top] == height[i]:
                stack.pop()
                stack.append(i)
            else:
                while len(stack) > 0 and height[top] < height[i]:
                    mid = stack.pop()
                    if len(stack) > 0:
                        left = stack[len(stack) - 1]
                        h = min(height[i], height[left]) - height[mid]
                        w = i - left - 1
                        result += h * w
                        top = stack[len(stack) - 1]
                stack.append(i)

        return result


# test
solution = Solution()
res = solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
print(res)
