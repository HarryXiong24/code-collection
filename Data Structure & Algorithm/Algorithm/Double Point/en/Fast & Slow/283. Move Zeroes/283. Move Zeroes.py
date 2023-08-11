# 283. Move Zeroes

# Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
# Note that you must do this in-place without making a copy of the array.

# Example 1:
# Input: nums = [0,1,0,3,12]
# Output: [1,3,12,0,0]

# Example 2:
# Input: nums = [0]
# Output: [0]

from typing import List


class Solution:

    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        slow = 0
        fast = 0
        while fast < len(nums):
            if nums[fast] != 0:
                temp = nums[fast]
                nums[fast] = nums[slow]
                nums[slow] = temp
                slow = slow + 1
            fast = fast + 1

    def moveZeroes2(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        index = 0
        length = len(nums)
        for i in range(length):
            if nums[i] != 0:
                nums[index] = nums[i]
                index = index + 1
        # add 0
        for i in range(index, length):
            nums[i] = 0


# test
test = [0, 1, 0, 3, 12]
test2 = [0, 1, 0, 3, 12]
solution = Solution()
solution.moveZeroes(test)
solution.moveZeroes2(test2)
print(test)
print(test2)