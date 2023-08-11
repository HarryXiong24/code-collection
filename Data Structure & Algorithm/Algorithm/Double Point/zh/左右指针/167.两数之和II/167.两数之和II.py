# 167 两数之和 II - 输入有序数组

# 给定一个已按照升序排列的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target。
# 函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。
# numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length。
# 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

# 输入：numbers = [2,7,11,15], target = 9
# 输出：[1,2]
# 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。

# 此题和二分查找的思路一样
from typing import List


class Solution:

    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left = 0
        right = len(numbers) - 1
        while left <= right:
            if numbers[left] + numbers[right] == target:
                return [left + 1, right + 1]
            if numbers[left] + numbers[right] < target:
                left = left + 1
            if numbers[left] + numbers[right] > target:
                right = right - 1
        return []


# test
arr = [2, 7, 11, 15]
solution = Solution()
res = solution.twoSum(arr, 9)
print(res)
