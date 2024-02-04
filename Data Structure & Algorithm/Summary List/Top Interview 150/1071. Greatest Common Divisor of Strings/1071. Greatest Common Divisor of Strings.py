# 1071. Greatest Common Divisor of Strings

# For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).

# Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

# Example 1:
# Input: str1 = "ABCABC", str2 = "ABC"
# Output: "ABC"

# Example 2:
# Input: str1 = "ABABAB", str2 = "ABAB"
# Output: "AB"

# Example 3:
# Input: str1 = "LEET", str2 = "CODE"
# Output: ""


# T: O(n)
# S: O(1)
class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        len1, len2 = len(str1), len(str2)

        def valid(k) -> bool:
            if len1 % k != 0 and len2 % k != 0:
                return False
            n1 = len1 // k
            n2 = len2 // k
            base = str1[0:k]
            return base * n1 == str1 and base * n2 == str2

        for i in range(min(len1, len2), 0, -1):
            if valid(i):
                return str1[0:i]
        return ""

    def gcdOfStrings1(self, str1: str, str2: str) -> str:
        def gcd(x: int, y: int) -> int:
            if y == 0:
                return x
            else:
                return gcd(y, x % y)

        if str1 + str2 != str2 + str1:
            return ""

        length = gcd(len(str1), len(str2))
        return str1[0:length]


# test
solution = Solution()
res = solution.gcdOfStrings("ABABAB", "ABAB")
res1 = solution.gcdOfStrings1("ABABAB", "ABAB")
print(res)
print(res1)
