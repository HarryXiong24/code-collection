# 50 Pow(x, n)

# 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，x^n ）

# 示例 1：
# 输入：x = 2.00000, n = 10
# 输出：1024.00000

# 示例 2：
# 输入：x = 2.10000, n = 3
# 输出：9.26100

# 示例 3：
# 输入：x = 2.00000, n = -2
# 输出：0.25000
# 解释：2-2 = 1/22 = 1/4 = 0.25


class Solution:

    def myPow(self, x: float, n: int) -> float:
        power = abs(n)
        res = self.myPositivePow(x, power)
        if n > 0:
            return res
        else:
            return 1 / res

    def myPositivePow(self, x: float, n: int) -> float:
        if n == 0:
            return 1
        half = self.myPositivePow(x, n // 2)
        if n % 2 == 0:
            return half * half
        else:
            return half * half * x


# test
solution = Solution()
res = solution.myPow(2, 10)
print(res)
