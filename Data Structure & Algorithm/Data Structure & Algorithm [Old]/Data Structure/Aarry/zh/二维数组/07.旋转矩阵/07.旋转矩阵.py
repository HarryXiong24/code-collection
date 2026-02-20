# 07 旋转矩阵

# 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节
# 请你设计一种算法，将图像旋转 90 度
# 给定 matrix =
# [
#  [1,2,3],
#  [4,5,6],
#  [7,8,9]
# ],
# 原地旋转输入矩阵，使其变为:
# [
#  [7,4,1],
#  [8,5,2],
#  [9,6,3]
# ]

# 其实就是先水平翻转， 然后主对角线翻转
from typing import List


class Solution:

    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        length = len(matrix)
        for i in range(length // 2):
            for j in range(length):
                temp = matrix[i][j]
                matrix[i][j] = matrix[length - i - 1][j]
                matrix[length - i - 1][j] = temp
        for i in range(length):
            for j in range(i):
                temp = matrix[i][j]
                matrix[i][j] = matrix[j][i]
                matrix[j][i] = temp


# test
arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
solution = Solution()
solution.rotate(arr)
print(arr)