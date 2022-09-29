# 27 移除元素

# 和题 283 原理一致
# 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
# 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组
# 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素

from typing import List


class Solution:

    def removeElement(self, nums: List[int], val: int) -> int:
        # slow 指针左边的数均为 0
        slow = 0
        fast = 0
        while fast < len(nums):
            if nums[fast] != val:
                temp = nums[fast]
                nums[fast] = nums[slow]
                nums[slow] = temp
                slow = slow + 1
            fast = fast + 1
        return slow


# test
arr = [0, 1, 2, 2, 3, 0, 4, 2]
solution = Solution()
res = solution.removeElement(arr, 2)
print(res, arr)
