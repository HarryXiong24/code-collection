# 283 移动零

# 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序
# 示例:
# 输入: [0,1,0,3,12]
# 输出: [1,3,12,0,0]

# 法一：
# 使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部
# 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移
# 注意到以下性质：
# 1.左指针左边均为非零数
# 2.右指针左边直到左指针处均为零
# 因此每次交换，都是将左指针的零与右指针的非零数交换，且非零数的相对顺序并未改变。

# 法二：
# 将非 0 的元素移动至前面，后面补 0

from typing import List


class Solution:

    # 法一
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        left = 0
        right = 0
        while right < len(nums):
            if nums[right] != 0:
                temp = nums[right]
                nums[right] = nums[left]
                nums[left] = temp
                left = left + 1
            right = right + 1

    # 法二
    def moveZeroes2(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        index = 0
        length = len(nums)
        for i in range(length):
            if nums[i] != 0:
                nums[index] = nums[i]
                index = index + 1
        # 补 0
        for i in range(index, length):
            nums[i] = 0


# test
test = [0, 1, 0, 3, 12]
test2 = [0, 1, 0, 3, 12]
solution = Solution()
solution.moveZeroes(test)
solution.moveZeroes2(test2)
print(test)
print(test2)