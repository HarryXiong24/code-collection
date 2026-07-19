# DESCRIPTION (inspired by Leetcode.com)
# Given a sorted array of integers nums, determine if there exists a pair of numbers that sum to a given target.

# Example 1:
# Input:
# nums = [1,3,4,6,8,10,13]
# target = 13
# Output:
# True # (3 + 10 = 13)

# Example 2:
# Input:
# nums = [1,3,4,6,8,10,13]
# target = 6
# Output:
# False

# Time Complexity: O(n)
# Space Complexity: O(1)
class Solution:
    def twoSum(self, nums: list[int], target: int) -> bool:
        # Your code goes here
        left = 0
        right = len(nums) - 1

        while left < right:
            if nums[left] + nums[right] < target:
                left += 1
            elif nums[left] + nums[right] > target:
                right -= 1
            else:
                return True

        return False


# test
res = Solution().twoSum([1, 3, 4, 6, 8, 10, 13], 6)
print(res)
