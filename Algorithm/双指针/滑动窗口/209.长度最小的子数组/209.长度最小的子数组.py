# 209 长度最小的子数组

# 给定一个含有 n 个正整数的数组和一个正整数 target
# 找出该数组中满足其和 ≥ target 的长度最小的连续子数组 [numsl, numsl+1, ..., numsr-1, numsr]
# 并返回其长度
# 如果不存在符合条件的子数组，返回 0

# 示例：
# 输入：target = 7, nums = [2,3,1,2,4,3]
# 输出：2
# 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

from typing import List


class Solution:

    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        slow = 0
        fast = 0
        res = len(nums) + 1  # 初始值应该置大
        sum = 0
        while fast < len(nums):
            sum = sum + nums[fast]
            fast = fast + 1
            while sum >= target:
                res = min(res, fast - slow)
                sum = sum - nums[slow]
                slow = slow + 1
        if res > len(nums):
            return 0
        else:
            return res


# test
arr = [2, 3, 1, 2, 4, 3]
solution = Solution()
res = solution.minSubArrayLen(7, arr)
print(res)