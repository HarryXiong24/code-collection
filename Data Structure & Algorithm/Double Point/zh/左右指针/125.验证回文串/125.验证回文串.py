# 125 验证回文串

# 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写
# 说明：本题中，我们将空字符串定义为有效的回文串

import re


class Solution:

    def isPalindrome(self, s: str) -> bool:
        pattern = re.compile(r'[A-Za-z0-9]+')
        arr = pattern.findall(s.upper())
        str = ''.join(arr)
        print(str)
        left = 0
        right = len(str) - 1
        while left <= right:
            if str[left] == str[right]:
                left = left + 1
                right = right - 1
            else:
                return False
        return True

# test
str = 'A man, a plan, a canal: Panama'
solution = Solution()
res = solution.isPalindrome(str)
print(res)