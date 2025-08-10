# 50. Pow(x, n)

# Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

# Example 1:
# Input: x = 2.00000, n = 10
# Output: 1024.00000

# Example 2:
# Input: x = 2.10000, n = 3
# Output: 9.26100

# Example 3:
# Input: x = 2.00000, n = -2
# Output: 0.25000
# Explanation: 2-2 = 1/22 = 1/4 = 0.25

class Solution:
    def myPow(self, x: float, n: int) -> float:
        def positivePow(x: float, n: int):
            if n == 0:
                return 1
            half = positivePow(x, n // 2)
            if n % 2 == 0:
                return half * half
            if n % 2 == 1:
                return half * half * x

        if n < 0:
            return 1 / positivePow(x, -n)
        else:
            return positivePow(x, n)


# test
solution = Solution()
res = solution.myPow(2, 10)
res1 = solution.myPow(8.84372, -5)
print(res)
print(res1)
