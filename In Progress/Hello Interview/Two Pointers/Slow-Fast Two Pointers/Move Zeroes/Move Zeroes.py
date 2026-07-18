# DESCRIPTION (inspired by Leetcode.com)
# Given an integer array nums, write a function to rearrange the array by moving all zeros to the end while keeping the order of non-zero elements unchanged. Perform this operation in-place without creating a copy of the array.

# Input:
# nums = [2,0,4,0,9]

# Output:
# [2,4,9,0,0]


class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        # Your code goes here
        nextNonZeroIndex = 0

        for i in range(0, len(nums)):
            if nums[i] != 0:
                temp = nums[nextNonZeroIndex]
                nums[nextNonZeroIndex] = nums[i]
                nums[i] = temp
                nextNonZeroIndex += 1


# test
nums = [2, 0, 4, 0, 9]
Solution().moveZeroes(nums)
print(nums)
