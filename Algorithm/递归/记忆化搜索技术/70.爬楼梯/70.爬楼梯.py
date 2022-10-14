# 70 爬楼梯

# 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
# 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

# 输入：n = 2
# 输出：2
# 解释：有两种方法可以爬到楼顶
# 1. 1 阶 + 1 阶
# 2. 2 阶


class Solution:
    cache = {}

    def climbStairs(self, n: int) -> int:
        if n == 0:
            return 0
        if n == 1:
            return 1
        if n == 2:
            return 2

        if n in self.cache:
            return self.cache[n]
        else:
            self.cache[n] = self.climbStairs(n - 1) + self.climbStairs(n - 2)
        return self.cache[n]


# test
solution = Solution()
res = solution.climbStairs(44)
print(res)
