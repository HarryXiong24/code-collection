# 209. Minimum Size Subarray Sum

# Given an array of positive integers nums and a positive integer target, return the minimal length of a
# subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

# Example 1:
# Input: target = 7, nums = [2,3,1,2,4,3]
# Output: 2
# Explanation: The subarray [4,3] has the minimal length under the problem constraint.

# Example 2:
# Input: target = 4, nums = [1,4,4]
# Output: 1

# Example 3:
# Input: target = 11, nums = [1,1,1,1,1,1,1,1]
# Output: 0

from typing import List


class Solution:

    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        max_length = 100000000
        slow = 0
        total = 0
        for fast in range(0, len(nums)):
            total = total + nums[fast]
            while total >= target:
                if fast + 1 - slow < max_length:
                    max_length = fast + 1 - slow
                total = total - nums[slow]
                slow = slow + 1

        if max_length != 100000000:
            return max_length
        else:
            return 0


# test
solution = Solution()
res = solution.minSubArrayLen(7, [2, 3, 1, 2, 4, 3])
print(res)
