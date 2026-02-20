# 215 数组中的第K个最大元素

# 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素
# 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素

# 思路： 先排序，之后再倒数的取出数即可

from typing import List


class Solution:

    def findKthLargest(self, nums: List[int], k: int) -> int:
        nums.sort()
        return nums[len(nums) - k]


# test
arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
solution = Solution()
res = solution.findKthLargest(arr, 4)
print(res)
