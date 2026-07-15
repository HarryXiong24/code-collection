# 67. Add Binary

# Given two binary strings a and b, return their sum as a binary string.

# Example 1:
# Input: a = "11", b = "1"
# Output: "100"

# Example 2:
# Input: a = "1010", b = "1011"
# Output: "10101"


class Solution:

    def addBinary(self, a: str, b: str) -> str:
        res = ''
        max_length = max(len(a), len(b))
        carry = 0

        i = 1
        while i <= max_length:
            temp = carry
            if len(a) - i >= 0:
                temp = temp + int(a[len(a) - i])
            if len(b) - i >= 0:
                temp = temp + int(b[len(b) - i])
            carry = int(temp / 2)
            res = str(temp % 2) + res
            i = i + 1

        if carry > 0:
            res = str(carry) + res

        return res


# test
solution = Solution()
res = solution.addBinary("11", "1")
print(res)