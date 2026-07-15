# 209. Minimum Size Subarray Sum

# Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

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
        slow = 0
        fast = 0

        total = 0
        res = len(nums) + 1

        while fast < len(nums):
            total += nums[fast]

            if total >= target:
                while total - nums[slow] >= target:
                    slow += 1
                    total -= nums[slow]
                res = min(res, fast - slow + 1)

            fast += 1

        return res if res != len(nums) + 1 else 0


# test
solution = Solution()
res = solution.minSubArrayLen(7, [2, 3, 1, 2, 4, 3])
print(res)
