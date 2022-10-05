# 498 对角线遍历

# 给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。

# 示例 1：
# 输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
# 输出：[1,2,4,7,5,3,6,8,9]

# 示例 2：
# 输入：mat = [[1,2],[3,4]]
# 输出：[1,2,3,4]

from typing import List


class Solution:

    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        res = []
        row = len(mat)
        col = len(mat[0])

        # 从 0 开始计算每层
        for l in range(row + col - 1):
            temp = []
            x = 0
            y = 0

            # 每第 l 层从最右边开始计算
            if l < col:
                x = 0
            else:
                x = l - col + 1

            if l < col:
                y = l
            else:
                y = col - 1

            while x < row and y >= 0:
                temp.append(mat[x][y])
                x = x + 1
                y = y - 1

            if l % 2 == 0:
                temp.reverse()

            res.extend(temp)

        return res


# test
arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
solution = Solution()
res = solution.findDiagonalOrder(arr)
print(res)