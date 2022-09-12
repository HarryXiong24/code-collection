# 27 移除元素

# 和题 283 原理一致
# 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
# 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组
# 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素

from typing import List


class Solution:

    def removeElement(self, nums: List[int], val: int) -> int:
        # 左指针左边的数均为 0
        left = 0
        right = 0
        while right < len(nums):
            if nums[right] != val:
                temp = nums[right]
                nums[right] = nums[left]
                nums[left] = temp
                left = left + 1
            right = right + 1
        return left


# test
# test
test = [0, 1, 2, 2, 3, 0, 4, 2]
solution = Solution()
res = solution.removeElement(test, 2)
print(res, test)
