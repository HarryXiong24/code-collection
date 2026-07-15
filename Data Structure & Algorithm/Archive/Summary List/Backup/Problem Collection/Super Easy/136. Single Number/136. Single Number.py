# 136. Single Number

# Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

# You must implement a solution with a linear runtime complexity and use only constant extra space.

# Example 1:
# Input: nums = [2,2,1]
# Output: 1

# Example 2:
# Input: nums = [4,1,2,1,2]
# Output: 4

# Example 3:
# Input: nums = [1]
# Output: 1

from typing import List


class Solution:

    def singleNumber(self, nums: List[int]) -> int:
        s = set({})
        for item in nums:
            if item in s:
                s.remove(item)
            else:
                s.add(item)
        return list(s)[0]


# test
solution = Solution()
res = solution.singleNumber([4, 1, 2, 1, 2])
print(res)
