# 487. Max Consecutive Ones II

# Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

# Example 1:
# Input: nums = [1,0,1,1,0]
# Output: 4
# Explanation:
# - If we flip the first zero, nums becomes [1,1,1,1,0] and we have 4 consecutive ones.
# - If we flip the second zero, nums becomes [1,0,1,1,1] and we have 3 consecutive ones.
# The max number of consecutive ones is 4.

# Example 2:
# Input: nums = [1,0,1,1,0,1]
# Output: 4
# Explanation:
# - If we flip the first zero, nums becomes [1,1,1,1,0,1] and we have 4 consecutive ones.
# - If we flip the second zero, nums becomes [1,0,1,1,1,1] and we have 4 consecutive ones.
# The max number of consecutive ones is 4.

from typing import List


class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        fast = 0
        slow = 0
        zero_num = 0
        max_num = 0

        while fast < len(nums):
            if nums[fast] == 0:
                zero_num = zero_num+1

            while zero_num > 1:
                if nums[slow] == 0:
                    zero_num = zero_num - 1
                slow = slow+1

            if fast-slow+1 > max_num:
                max_num = fast-slow+1

            fast = fast+1

        return max_num


# test
solution = Solution()
res = solution.findMaxConsecutiveOnes([1, 1, 0, 1])
print(res)
