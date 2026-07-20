# DESCRIPTION (inspired by Leetcode.com)
# Write a function to calculate the total amount of water trapped between bars on an elevation map, where each bar's width is 1. The input is given as an array of n non-negative integers height representing the height of each bar.

# Example:
# Count: 10
# height = [3, 4, 1, 2, 2, 5, 1, 0, 2]
# Output: 10

# Time Complexity: O(n)
# Space Complexity: O(1)
class Solution:
    def trappingWater(self, height: list[int]) -> int:
        # Your code goes here
        slow = 0
        fast = slow + 1
        cannot_trapped = 0
        amount = 0

        # this step is for find the right max index
        right_max = len(height) - 1
        while height[right_max - 1] > height[right_max]:
            right_max -= 1

        while fast <= right_max:
            if height[slow] < height[fast] or fast == right_max:
                amount += (
                    min(height[slow], height[fast]) * (fast - slow - 1) - cannot_trapped
                )
                slow = fast
                fast = slow + 1
                cannot_trapped = 0
            else:
                cannot_trapped += height[fast]
                fast += 1

        return amount


# test
res = Solution().trappingWater([3, 4, 1, 2, 2, 5, 1, 0, 2])
print(res)
