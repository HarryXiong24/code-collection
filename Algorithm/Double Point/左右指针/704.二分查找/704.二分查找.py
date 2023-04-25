# 704 二分查找

# 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target
# 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

# 示例 1:
# 输入: nums = [-1,0,3,5,9,12], target = 9
# 输出: 4
# 解释: 9 出现在 nums 中并且下标为 4

# 示例 2:
# 输入: nums = [-1,0,3,5,9,12], target = 2
# 输出: -1
# 解释: 2 不存在 nums 中因此返回 -1

from typing import List


class Solution:

    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1
        while left <= right:
            middle = (left + right) // 2
            if target < nums[middle]:
                right = middle - 1
            elif target > nums[middle]:
                left = middle + 1
            else:
                return middle
        return -1


# test
nums = [-1, 0, 3, 5, 9, 12]
solution = Solution()
res = solution.search(nums, 9)
print(res)