# 54. Spiral Matrix

# Given an m x n matrix, return all elements of the matrix in spiral order.

# Example 1:
# Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
# Output: [1,2,3,6,9,8,7,4,5]

# Example 2:
# Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
# Output: [1,2,3,4,8,12,11,10,9,5,6,7]

from typing import List


class Solution:

    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        row = len(matrix)
        col = len(matrix[0])
        res_length = row * col

        turn = 0
        # termination condition
        while len(res) < res_length:
            x = turn
            y = turn
            x_max = row - turn - 1
            y_max = col - turn - 1

            while y <= y_max:
                res.append(matrix[x][y])
                y = y + 1

            y = y_max
            x = x + 1
            while x <= x_max:
                res.append(matrix[x][y])
                x = x + 1

            x = x_max
            y = y - 1
            while y >= turn:
                res.append(matrix[x][y])
                y = y - 1

            y = turn
            x = x - 1
            while x > turn:
                res.append(matrix[x][y])
                x = x - 1

            turn = turn + 1

        return res[0:res_length]


# test
arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
solution = Solution()
res = solution.spiralOrder(arr)
print(res)