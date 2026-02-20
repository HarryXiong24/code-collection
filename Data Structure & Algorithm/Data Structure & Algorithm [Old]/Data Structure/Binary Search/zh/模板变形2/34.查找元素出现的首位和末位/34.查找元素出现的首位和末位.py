# 34 在排序数组中查找元素的第一个和最后一个位置

# 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
# 找出给定目标值在数组中的开始位置和结束位置。
# 如果数组中不存在目标值 target，返回 [-1, -1]。
# 进阶：你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
# 输入：nums = [5,7,7,8,8,10], target = 8
# 输出：[3,4]

from typing import List


class Solution:

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if len(nums) == 0:
            return [-1, -1]
        left = 0
        right = len(nums) - 1
        while left + 1 < right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid
            elif nums[mid] > target:
                right = mid
            else:
                l = mid
                r = mid
                while l >= 0 and target == nums[l]:
                    l = l - 1
                    continue
                while r < len(nums) and target == nums[r]:
                    r = r + 1
                    continue
                print(l, r)
                return [l + 1, r - 1]

        if target == nums[left] and target == nums[right]:
            return [left, right]
        if target == nums[left]:
            return [left, left]
        if target == nums[right]:
            return [right, right]
        return [-1, -1]


# test
solution = Solution()
res = solution.searchRange([1, 2, 2], 1)
print(res)
