# DESCRIPTION (inspired by Leetcode.com)
# Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring. A well-formed parentheses string is one that follows these rules:

# Open brackets must be closed by a matching pair in the correct order.
# For example, given the string "(()", the longest valid parentheses substring is "()", which has a length of 2. Another example is the string ")()())", where the longest valid parentheses substring is "()()", which has a length of 4.

# Example 1:
# Inputs:
# s = "())))"
# Output:
# 2
# (Explanation: The longest valid parentheses substring is "()")

# Example 2:
# Inputs:
# s = "((()()())"
# Output:
# 8
# (Explanation: The longest valid parentheses substring is "(()()())" with a length of 8)

# Example 3:
# Inputs:
# s = ""
# Output:
# 0

# Time Complexity: O(n) - where n is the length of the input string
# Space Complexity: O(n) - where n is the length of the input string (for the stack)
class Solution:
    def longest_valid_parentheses(self, s: str) -> int:
        # Your code goes here
        stack = [-1]
        longest_length = 0

        for index, char in enumerate(s):
            if char == "(":
                stack.append(index)
            else:
                stack.pop()
                if len(stack) > 0:
                    longest_length = max(longest_length, index - stack[len(stack) - 1])
                else:
                    stack.append(index)

        return longest_length


# test
if __name__ == "__main__":
    solution = Solution()
    print(solution.longest_valid_parentheses("())))"))  # Output: 2
    print(solution.longest_valid_parentheses("((()()())"))  # Output: 8
    print(solution.longest_valid_parentheses("()(()"))  # Output: 2
    print(solution.longest_valid_parentheses("()(())"))  # Output: 6
    print(solution.longest_valid_parentheses("))()"))  # Output: 6
    print(solution.longest_valid_parentheses(""))  # Output: 0
