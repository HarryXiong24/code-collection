# 18. 4Sum

# Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

# 0 <= a, b, c, d < n
# a, b, c, and d are distinct.
# nums[a] + nums[b] + nums[c] + nums[d] == target
# You may return the answer in any order.

# Example 1:
# Input: nums = [1,0,-1,0,-2,2], target = 0
# Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

# Example 2:
# Input: nums = [2,2,2,2,2], target = 8
# Output: [[2,2,2,2]]


from typing import List


class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        res = []
        quadruplet = []
        count = 4
        nums.sort()

        def kSum(current: int, count: int, k_target: int):

            if count == 2:
                left = current
                right = len(nums) - 1
                while (left < right):
                    k_sum = nums[left] + nums[right]
                    if (k_sum < k_target):
                        left = left + 1
                    elif (k_sum > k_target):
                        right = right - 1
                    else:
                        res.append(quadruplet +
                                   [nums[left], nums[right]])
                        left = left + 1
                        while left < right and nums[left] == nums[left - 1]:
                            left = left + 1
                return

            for i in range(current, len(nums) - count + 1):
                if i > current and nums[i] == nums[i-1]:
                    continue
                quadruplet.append(nums[i])
                kSum(i+1, count-1, k_target-nums[i])
                quadruplet.pop()

        kSum(0, count, target)

        return res


# test
solution = Solution()
res = solution.fourSum([1, 0, -1, 0, -2, 2], 0)
print(res)
