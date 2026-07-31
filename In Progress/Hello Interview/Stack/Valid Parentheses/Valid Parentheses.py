# DESCRIPTION (inspired by Leetcode.com)
# Given an input string s consisting solely of the characters '(', ')', '{', '}', '[' and ']', determine whether s is a valid string. A string is considered valid if every opening bracket is closed by a matching type of bracket and in the correct order, and every closing bracket has a corresponding opening bracket of the same type.

# Example 1:
# Inputs:
# s = "(){({})}"
# Output:
# True

# Example 2:
# Inputs:
# s = "(){({}})"
# Output:
# False

# Time Complexity: O(n)
# Space Complexity: O(n), because we are using a stack to store the characters
class Solution:
    def isValid(self, s: str) -> bool:
        # Your code goes here
        symbol = {")": "(", "]": "[", "}": "{"}
        stack = []

        for char in s:
            if char not in symbol:
                stack.append(char)
            else:
                if len(stack) == 0:
                    return False
                top = stack.pop()
                if symbol[char] != top:
                    return False

        return len(stack) == 0


# test
res = Solution().isValid("(){({})}")
print(res)
