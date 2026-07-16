# 58. Length of Last Word

# Given a string s consisting of words and spaces, return the length of the last word in the string.

# A word is a maximal substring consisting of non-space characters only.

# Example 1:
# Input: s = "Hello World"
# Output: 5
# Explanation: The last word is "World" with length 5.

# Example 2:
# Input: s = "   fly me   to   the moon  "
# Output: 4
# Explanation: The last word is "moon" with length 4.

# Example 3:
# Input: s = "luffy is still joyboy"
# Output: 6
# Explanation: The last word is "joyboy" with length 6.


# T: O(n)
# S: O(1)
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        count = 0
        is_begin = False

        for i in range(len(s) - 1, -1, -1):
            if s[i] == " " and not is_begin:
                count = 0
            elif s[i] != " ":
                is_begin = True
                count += 1

            if s[i] == " " and is_begin:
                break

        return count


# test
solution = Solution()
res = solution.lengthOfLastWord("luffy is still joyboy")
print(res)
