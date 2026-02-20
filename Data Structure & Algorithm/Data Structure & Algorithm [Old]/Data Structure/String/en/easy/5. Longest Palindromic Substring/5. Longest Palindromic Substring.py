# 5. Longest Palindromic Substring

# Given a string s, return the longest palindromic substring in s.

# Example 1:
# Input: s = "babad"
# Output: "bab"
# Explanation: "aba" is also a valid answer.

# Example 2:
# Input: s = "cbbd"
# Output: "bb"

class Solution:

    def longestPalindrome(self, s: str) -> str:
        indices = []
        maxLength = -float("inf")

        def isPalindrome(low, high, s):
            nonlocal indices
            nonlocal maxLength
            while low >= 0 and high < len(s) and s[low] == s[high]:
                low -= 1
                high += 1

            if maxLength < high-low+1:
                maxLength = high-low+1
                indices = [low, high]

        for i in range(len(s)):
            isPalindrome(i, i, s)
            isPalindrome(i, i+1, s)

        return s[indices[0]+1: indices[1]]


# test
solution = Solution()
res = solution.longestPalindrome("babad")
print(res)
