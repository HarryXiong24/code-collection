# 977. Squares of a Sorted Array

# Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

# Example 1:
# Input: nums = [-4,-1,0,3,10]
# Output: [0,1,9,16,100]
# Explanation: After squaring, the array becomes [16,1,0,9,100].
# After sorting, it becomes [0,1,9,16,100].

# Example 2:
# Input: nums = [-7,-3,2,3,11]
# Output: [4,9,9,49,121]

from typing import List


class Solution:

    def sortedSquares(self, nums: List[int]) -> List[int]:
        left = 0
        right = len(nums) - 1
        current = right
        squares = [0] * len(nums)

        while left <= right:
            if abs(nums[right]) >= abs(nums[left]):
                squares[current] = nums[right]**2
                current = current - 1
                right = right - 1
            else:
                squares[current] = nums[left]**2
                current = current - 1
                left = left + 1

        return squares


# test
solution = Solution()
res = solution.sortedSquares([-4, -1, 0, 3, 10])
print(res)
