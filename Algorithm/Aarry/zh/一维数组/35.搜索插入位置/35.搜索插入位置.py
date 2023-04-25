# 35 搜索插入位置

# 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引
# 如果目标值不存在于数组中，返回它将会被按顺序插入的位置
# 请必须使用时间复杂度为 O(log n) 的算法

# 示例 1:
# 输入: nums = [1,3,5,6], target = 5
# 输出: 2

# 示例 2:
# 输入: nums = [1,3,5,6], target = 2
# 输出: 1

# 示例 3:
# 输入: nums = [1,3,5,6], target = 7
# 输出: 4

# test
from typing import List


class Solution:

    def searchInsert(self, nums: List[int], target: int) -> int:
        # 开始位置
        if target < nums[0]:
            return 0
        # 结束位置
        if target > nums[len(nums) - 1]:
            return len(nums)
        # 中间情况
        for i in range(len(nums)):
            if nums[i] == target:
                return i
            if nums[i + 1] == target:
                return i + 1
            if target > nums[i] and target < nums[i + 1]:
                return i + 1
        return -1


# test
arr = [1, 3, 5, 6]
solution = Solution()
res = solution.searchInsert(arr, 2)
print(res)