# DESCRIPTION (inspired by Leetcode.com)
# Given an encoded string, write a function to return its decoded string that follows a specific encoding rule: k[encoded_string], where the encoded_string within the brackets is repeated exactly k times. Note that k is always a positive integer. The input string is well-formed without any extra spaces, and square brackets are properly matched. Also, assume that the original data doesn't contain digits other than the ones that specify the number of times to repeat the following encoded_string.

# Inputs:
# s = "3[a2[c]]"
# Output:
# "accaccacc"

# Time Complexity: O(N)
# Space Complexity: O(N)
class Solution:
    def decodeString(self, s: str) -> str:
        number_stack: list[int] = []
        string_stack: list[str] = []
        num = 0

        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c == "[":
                number_stack.append(num)
                num = 0
                string_stack.append("[")
            elif c == "]":
                temp = ""
                top = string_stack.pop()
                while top != "[":
                    temp = top + temp
                    top = string_stack.pop()
                string_stack.append(temp * number_stack.pop())
            else:
                string_stack.append(c)

        return "".join(string_stack)


# test
res = Solution().decodeString("3[a2[c]]")
print(res)
