# 1190. Reverse Substrings Between Each Pair of Parentheses

# You are given a string s that consists of lower case English letters and brackets.

# Reverse the strings in each pair of matching parentheses, starting from the innermost one.

# Your result should not contain any brackets.

# Example 1:
# Input: s = "(abcd)"
# Output: "dcba"

# Example 2:
# Input: s = "(u(love)i)"
# Output: "iloveu"
# Explanation: The substring "love" is reversed first, then the whole string is reversed.

# Example 3:
# Input: s = "(ed(et(oc))el)"
# Output: "leetcode"
# Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

class Solution:
    def reverseParentheses(self, s: str) -> str:
        stack = []

        for item in s:
            if item != ')':
                stack.append(item)
            else:
                temp = []
                while True:
                    cur = stack.pop()
                    if cur != '(':
                        temp.append(cur)
                    else:
                        break
                stack.extend(temp)
        return ''.join(stack)


# test
solution = Solution()
res = solution.reverseParentheses("(abcd)")
print(res)
