# 744 寻找比目标字母大的最小字母

# 给你一个排序后的字符列表 letters ，列表中只包含小写英文字母。另给出一个目标字母 target，请你寻找在这一有序列表里比目标字母大的最小字母。
# 在比较时，字母是依序循环出现的。举个例子：

# 如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'
#
# 示例 1：
# 输入: letters = ["c", "f", "j"]，target = "a"
# 输出: "c"

# 示例 2:
# 输入: letters = ["c","f","j"], target = "c"
# 输出: "f"

# 示例 3:
# 输入: letters = ["c","f","j"], target = "d"
# 输出: "f"

from bisect import bisect_right
from typing import List


class Solution:

    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        left = 0
        right = len(letters) - 1

        # 注意如果目标值大于或等于有序列表的最后一项，返回值为首元素
        if target >= letters[-1]:
            return letters[0]

        # 二分查找缩小左右边界即可
        while left < right:

            mid = left + (right - left) // 2

            if letters[mid] <= target:
                left = mid + 1
            else:
                right = mid

        return letters[left]


# test
solution = Solution()
res = solution.nextGreatestLetter(["c", "f", "j"], "d")
print(res)
