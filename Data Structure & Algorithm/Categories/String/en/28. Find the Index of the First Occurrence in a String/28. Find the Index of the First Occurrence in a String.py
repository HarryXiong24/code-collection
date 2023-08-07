# 28. Find the Index of the First Occurrence in a String

# Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

# Example 1:
# Input: haystack = "sadbutsad", needle = "sad"
# Output: 0
# Explanation: "sad" occurs at index 0 and 6.
# The first occurrence is at index 0, so we return 0.

# Example 2:
# Input: haystack = "leetcode", needle = "leeto"
# Output: -1
# Explanation: "leeto" did not occur in "leetcode", so we return -1.


class Solution:

    def strStr(self, haystack: str, needle: str) -> int:
        res = -1
        slow = 0
        fast = 0

        for i in range(0, len(haystack)):
            slow = i
            fast = slow
            for j in range(0, len(needle)):
                if fast > len(haystack) - 1 or haystack[fast] != needle[j]:
                    break
                fast = fast + 1
            if fast - slow == len(needle):
                return slow
            else:
                slow = slow + 1

        return res


# test
solution = Solution()
res = solution.strStr("sadbutsad", "addsdsdsdsdsdsdsd")
print(res)
