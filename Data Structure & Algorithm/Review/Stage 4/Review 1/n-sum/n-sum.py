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
        res: List[List[int]] = []

        nums.sort()

        for i in range(0, len(nums)):
            if i > 0 and nums[i - 1] == nums[i]:
                continue

            for j in range(i + 1, len(nums)):
                if j > i + 1 and nums[j - 1] == nums[j]:
                    continue

                left = j + 1
                right = len(nums) - 1

                while left < right:
                    if nums[i] + nums[j] + nums[left] + nums[right] < target:
                        left += 1
                    elif nums[i] + nums[j] + nums[left] + nums[right] > target:
                        right -= 1
                    else:
                        res.append([nums[i], nums[j], nums[left], nums[right]])

                        while left < right and nums[left + 1] == nums[left]:
                            left += 1

                        while left < right and nums[right - 1] == nums[right]:
                            right -= 1

                        left += 1
                        right -= 1
        return res


# test
solution = Solution()
res = solution.fourSum([1, 0, -1, 0, -2, 2], 0)
res1 = solution.fourSum([2, 2, 2, 2, 2], 8)
print(res)
print(res1)
