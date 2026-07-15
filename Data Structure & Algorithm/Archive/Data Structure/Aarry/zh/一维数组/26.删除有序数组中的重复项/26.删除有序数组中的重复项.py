# 26 删除有序数组中的重复项

# 给你一个有序数组 nums，请你原地删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度
# 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成

# 采用快慢指正
from typing import List


class Solution:

    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0
        slow = 1
        fast = 1
        while fast < len(nums):
            if nums[fast] != nums[fast - 1]:
                nums[slow] = nums[fast]
                slow = slow + 1
            fast = fast + 1
        return slow


# test
arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
solution = Solution()
res = solution.removeDuplicates(arr)
print(res, arr)