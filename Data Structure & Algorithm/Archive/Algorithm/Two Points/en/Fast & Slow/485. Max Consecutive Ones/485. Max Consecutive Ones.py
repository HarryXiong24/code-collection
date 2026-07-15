# 485. Max Consecutive Ones

# Given a binary array nums, return the maximum number of consecutive 1's in the array.

# Example 1:
# Input: nums = [1,1,0,1,1,1]
# Output: 3
# Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

# Example 2:
# Input: nums = [1,0,1,1,0,1]
# Output: 2

from typing import List


class Solution:

    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        res = 0
        slow = 0
        fast = slow
        while slow < len(nums):
            while fast < len(nums) and nums[fast] == 1:
                fast = fast + 1

            if fast - slow > res:
                res = fast - slow

            slow = slow + 1
            fast = slow

        return res


# test
solution = Solution()
res = solution.findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])
print(res)
