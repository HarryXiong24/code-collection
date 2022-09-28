# 14 最长公共前缀

# 编写一个函数来查找字符串数组中的最长公共前缀
# 如果不存在公共前缀，返回空字符串 ""

# 示例 1：
# 输入：strs = ["flower","flow","flight"]
# 输出："fl"

# 示例 2：
# 输入：strs = ["dog","racecar","car"]
# 输出：""
# 解释：输入不存在公共前缀。

from typing import List


class Solution:

    def longestCommonPrefix(self, strs: List[str]) -> str:
        minStr = strs[0]
        length = len(strs)
        for i in range(1, length):
            if len(minStr) > len(strs[i]):
                minStr = strs[i]

        res = ''
        for i in range(len(minStr)):
            flag = True
            for j in range(length):
                if strs[j][i] != minStr[i]:
                    flag = False

            if flag == True:
                res = res + minStr[i]
            else:
                return res

        return res


# test
strs = ["flower", "flow", "flight"]
solution = Solution()
res = solution.longestCommonPrefix(strs)
print(res)
