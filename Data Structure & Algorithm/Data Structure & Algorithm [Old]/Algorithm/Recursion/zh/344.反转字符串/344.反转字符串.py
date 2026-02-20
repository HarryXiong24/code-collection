# 344 反转字符串

# 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
# 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
# 示例 1：
# 输入：s = ["h","e","l","l","o"]
# 输出：["o","l","l","e","h"]

# Do not return anything, modify s in-place instead.

# 本题可以用双指针，这里采用递归

from typing import List


class Solution:

    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        self.reverse(s, 0, len(s) - 1)

    def reverse(self, s: List[str], left: int, right: int) -> None:
        if left > right:
            return
        self.reverse(s, left + 1, right - 1)
        temp = s[right]
        s[right] = s[left]
        s[left] = temp


# test
s = ['h', 'e', 'l', 'l', 'o']
solution = Solution()
solution.reverseString(s)
print(s)
