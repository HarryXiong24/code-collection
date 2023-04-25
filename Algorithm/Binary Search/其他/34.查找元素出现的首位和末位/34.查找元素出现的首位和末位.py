# 34 在排序数组中查找元素的第一个和最后一个位置

# 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
# 找出给定目标值在数组中的开始位置和结束位置。
# 如果数组中不存在目标值 target，返回 [-1, -1]。
# 进阶：你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
# 输入：nums = [5,7,7,8,8,10], target = 8
# 输出：[3,4]

# 本题可以拆解为寻找左侧、右侧边界的二分搜索
from typing import List


class Solution:

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left = self.searchBound(nums, target, True)
        right = self.searchBound(nums, target, False)
        return [left, right]

    def searchBound(self, nums: List[int], target: int, isLeft: bool) -> int:
        left = 0
        right = len(nums) - 1
        res = -1
        while left <= right:
            mid = (left + right) // 2
            if target > nums[mid]:
                left = mid + 1
            elif target < nums[mid]:
                right = mid - 1
            else:
                res = mid
                if isLeft == True:
                    right = mid - 1
                else:
                    left = mid + 1
        return res


# test
solution = Solution()
res = solution.searchRange([5, 7, 7, 8, 8, 8, 10], 8)
print(res)
