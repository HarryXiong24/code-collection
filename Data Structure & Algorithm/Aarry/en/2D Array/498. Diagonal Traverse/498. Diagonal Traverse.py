# 498. Diagonal Traverse

# Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

# Example 1:
# Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
# Output: [1,2,4,7,5,3,6,8,9]

# Example 2:
# Input: mat = [[1,2],[3,4]]
# Output: [1,2,3,4]

from typing import List


class Solution:

    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        res = []
        row = len(mat)
        col = len(mat[0])
        for i in range(0, row + col - 1):
            temp = []
            x = 0
            y = 0
            if i < row:
                x = i
            else:
                x = row - 1
            if i < row:
                y = 0
            else:
                y = i - row + 1

            while x >= 0 and y < col:
                temp.append(mat[x][y])
                x = x - 1
                y = y + 1

            if i % 2 == 1:
                temp.reverse()

            res = res + temp

        return res


# test
arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
solution = Solution()
res = solution.findDiagonalOrder(arr)
print(res)