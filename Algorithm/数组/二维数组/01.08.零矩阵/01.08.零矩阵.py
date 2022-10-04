# 01.08 零矩阵

# 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

# 示例 1：
# 输入：
# [
#   [1,1,1],
#   [1,0,1],
#   [1,1,1]
# ]
# 输出：
# [
#   [1,0,1],
#   [0,0,0],
#   [1,0,1]
# ]

# 示例 2：
# 输入：
# [
#   [0,1,2,0],
#   [3,4,5,2],
#   [1,3,1,5]
# ]
# 输出：
# [
#   [0,0,0,0],
#   [0,4,5,0],
#   [0,3,1,0]
# ]

# test
from typing import List


class Solution:

    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # 用于记录行列
        record_i = set()
        record_j = set()
        # 记录行列
        for i in range(len(matrix)):
            for j in range(len(matrix[i])):
                if matrix[i][j] == 0:
                    record_i.add(i)
                    record_j.add(j)
        # 如果在记录里面，则置 0
        for i in range(len(matrix)):
            for j in range(len(matrix[i])):
                if i in record_i or j in record_j:
                    matrix[i][j] = 0


# test
arr = [[0, 0, 0, 5], [4, 3, 1, 4], [0, 1, 1, 4], [1, 2, 1, 3], [0, 0, 1, 1]]
solution = Solution()
solution.setZeroes(arr)
print(arr)