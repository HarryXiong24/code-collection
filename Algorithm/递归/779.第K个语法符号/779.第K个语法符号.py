# 779 第K个语法符号

# 我们构建了一个包含 n 行( 索引从 1  开始 )的表。首先在第一行我们写上一个 0
# 接下来的每一行，将前一行中的0替换为01，1替换为10。

# 例如，对于 n = 3 ，第 1 行是 0 ，第 2 行是 01 ，第3行是 0110 。
# 给定行数 n 和序数 k，返回第 n 行中第 k 个字符。（ k 从索引 1 开始）

# 示例 1:
# 输入: n = 1, k = 1
# 输出: 0
# 解释: 第一行：0

# 示例 2:
# 输入: n = 2, k = 1
# 输出: 0
# 解释:
# 第一行: 0
# 第二行: 01

# 示例 3:
# 输入: n = 2, k = 2
# 输出: 1
# 解释:
# 第一行: 0
# 第二行: 01


# 找规律，发现每一行的前半段就是上一行，后半段就是上一行的每个值反过来（0变1，1变0）
class Solution:

    def kthGrammar(self, n: int, k: int) -> int:
        if n == 1:
            return 0
        # 计算当前行的长度：2 的 N-1 次方
        length = 2**(n - 1)
        # 如果 K 大于长度的一半，就是 K 所在位置是后半段
        if k > length / 2:
            # 先得到上一行的值，位置是 K 相对于后半段的位置
            val = self.kthGrammar(n - 1, k - length / 2)
            # 然后把值反过来
            if val == 0:
                return 1
            else:
                return 0
        # 否则前半部分
        else:
            #值就是上一行 K 位置的值
            return self.kthGrammar(n - 1, k)


# test
solution = Solution()
res = solution.kthGrammar(4, 5)
print(res)
