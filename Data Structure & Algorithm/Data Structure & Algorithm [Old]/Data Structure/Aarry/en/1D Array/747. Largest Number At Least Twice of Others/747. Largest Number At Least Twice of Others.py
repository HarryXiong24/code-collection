# 747. Largest Number At Least Twice of Others

# You are given an integer array nums where the largest integer is unique.
# Determine whether the largest element in the array is at least twice as much as every other number in the array. If it is, return the index of the largest element, or return -1 otherwise.

# Example 1:
# Input: nums = [3,6,1,0]
# Output: 1
# Explanation: 6 is the largest integer.
# For every other number in the array x, 6 is at least twice as big as x.
# The index of value 6 is 1, so we return 1.

# Example 2:
# Input: nums = [1,2,3,4]
# Output: -1
# Explanation: 4 is less than twice the value of 3, so we return -1.

from typing import List


class Solution:

    def dominantIndex(self, nums: List[int]) -> int:
        if len(nums) < 2:
            return -1
        sortNums = sorted(nums, reverse=True)
        if sortNums[1] * 2 > sortNums[0]:
            return -1
        return nums.index(sortNums[0])


# test
arr = [3, 6, 1, 0]
solution = Solution()
res = solution.dominantIndex(arr)
print(res)