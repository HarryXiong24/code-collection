# 42. Trapping Rain Water

# Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

# Example 1:
# Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
# Output: 6
# Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

# Example 2:
# Input: height = [4,2,0,3,2,5]
# Output: 9


def trap(height):
    stack = []
    result = 0

    stack.append(0)

    for i in range(1, len(height)):
        if height[stack[len(stack) - 1]] >= height[i]:
            stack.append(i)
        else:
            while len(stack) > 0 and height[stack[len(stack) - 1]] < height[i]:
                mid = stack.pop()

                if len(stack) > 0:
                    left = stack[len(stack) - 1]
                    right = i

                    h = min(height[left], height[right]) - height[mid]
                    w = right - left - 1
                    result += h * w

            stack.append(i)

    return result


# Test
res = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
print(res)
