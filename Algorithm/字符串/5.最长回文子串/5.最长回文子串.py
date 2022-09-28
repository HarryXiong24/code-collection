# 5 最长回文子串

# 给你一个字符串 s，找到 s 中最长的回文子串。

# 示例 1：
# 输入：s = "babad"
# 输出："bab"
# 解释："aba" 同样是符合题意的答案。

# 示例 2：
# 输入：s = "cbbd"
# 输出："bb"

# 分析例子，得出三种情况：
# 1.非正常情况，长度小于2，直接返回
# 2.得出结果长度为奇数
# 3.得出结果长度为偶数

# 当为奇数时，需要找到这个中心点，中心点向两边扩散都是一一对应相等的，如：aba，cabac
# 当为偶数时，需要找到这两个中心点，两个中心点向两边扩散也都是一一对应相等的，如：abba，cabbac


class Solution:

    def longestPalindrome(self, s: str) -> str:

        length = len(s)
        result = ''
        if length < 2:
            return s

        def getResult(left, right):
            nonlocal result
            nonlocal length
            while left >= 0 and right < length and s[left] == s[right]:
                left = left - 1
                right = right + 1
            if right - left - 1 > len(result):
                result = s[left + 1:right]

        for i in range(length):
            getResult(i, i)
            getResult(i, i + 1)

        return result


# test
s = 'babad'
solution = Solution()
res = solution.longestPalindrome(s)
print(res)
