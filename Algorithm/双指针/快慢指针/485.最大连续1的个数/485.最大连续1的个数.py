# 485 最大连续 1 的个数

# 给定一个二进制数组, 计算其中最大连续 1 的个数

# 示例
# 输入：[1,1,0,1,1,1]
# 输出：3
# 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.

from typing import List


class Solution:
    # 双指针解法
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        res = 0
        slow = 0
        fast = 0
        length = len(nums)

        # 数组为空直接返回
        if length == 0:
            return 0

        while slow < length:
            if nums[slow] == 1:
                count = 0
                fast = slow
                while fast < length and nums[fast] == 1:
                    count = count + 1
                    fast = fast + 1
                if res < count:
                    res = count
            slow = slow + 1
        return res

    # 一次遍历
    def findMaxConsecutiveOnes2(self, nums: List[int]) -> int:
        res = 0
        count = 0
        length = len(nums)

        for i in range(length):
            if nums[i] == 1:
                count = count + 1
                if res < count:
                    res = count
            else:
                count = 0

        return res


# test
nums = [1, 1, 0, 1, 1, 1]
solution = Solution()
res1 = solution.findMaxConsecutiveOnes(nums)
res2 = solution.findMaxConsecutiveOnes2(nums)
print(res1)
print(res2)