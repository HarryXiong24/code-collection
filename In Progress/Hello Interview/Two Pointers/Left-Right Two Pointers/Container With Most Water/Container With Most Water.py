# DESCRIPTION (inspired by Leetcode.com)
# Given an array heights where each element represents the height of a vertical line, pick two lines to form a container. Return the maximum area (amount of water) the container can hold.

# What is area? Width × height, where width is the distance between walls, and height is the shorter wall (water overflows at the shorter wall).

# Example 1:
# max (21)
# heights = [3, 4, 1, 2, 2, 4, 1, 3, 2]
# Output:
# 21  # walls at indices 0 and 7 (both height 3): width=7, height=3, area=21

# Example 2:
# heights = [1, 2, 1]
# Output:
# 2  # walls at indices 0 and 2: width=2, height=min(1,1)=1, area=2


class Solution:
    def max_area(self, heights: list[int]) -> int:
        # Your code goes here
        left = 0
        right = len(heights) - 1
        max_area = min(heights[left], heights[right]) * (right - left)

        while left < right:
            if heights[left] > heights[right]:
                right -= 1
            else:
                left += 1
            cur = min(heights[left], heights[right]) * (right - left)
            max_area = max(max_area, cur)

        return max_area


# test
res = Solution().max_area([3, 4, 1, 2, 2, 4, 1, 3, 2])
print(res)

res1 = Solution().max_area([1, 2, 1])
print(res1)
