# DESCRIPTION (inspired by Leetcode.com)
# Write a function to sort a given integer array nums in-place (and without the built-in sort function), where the array contains n integers that are either 0, 1, and 2 and represent the colors red, white, and blue. Arrange the objects so that same-colored ones are adjacent, in the order of red, white, and blue (0, 1, 2).

# Input:
# nums = [2,1,2,0,1,0,1,0,1]
# Output:
# [0,0,0,1,1,1,1,2,2]

# Time Complexity: O(n)
# Space Complexity: O(1)
class Solution:
    def sortColors(self, nums: list[int]) -> None:
        # Your code goes here
        current_round = 0

        for i in range(0, 2):
            left = current_round
            right = len(nums) - 1

            while left < right:
                if nums[left] > nums[right]:
                    temp = nums[left]
                    nums[left] = nums[right]
                    nums[right] = temp

                if nums[left] == i:
                    left += 1
                right -= 1

            current_round = left


# test
nums = [2, 1, 2, 0, 1, 0, 1, 0, 1]
Solution().sortColors(nums)
print(nums)
