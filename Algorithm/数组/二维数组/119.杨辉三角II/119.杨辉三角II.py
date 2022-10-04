# 119 杨辉三角 II

# 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
# 在「杨辉三角」中，每个数是它左上方和右上方的数的和。

# 示例 1:
# 输入: rowIndex = 3
# 输出: [1,3,3,1]

# 示例 2:
# 输入: rowIndex = 0
# 输出: [1]

# 示例 3:
# 输入: rowIndex = 1
# 输出: [1,1]

from typing import List


class Solution:

    def getRow(self, rowIndex: int) -> List[int]:
        res = []
        for i in range(rowIndex + 1):
            temp = []
            for fill in range(i + 1):
                temp.append(1)
            for j in range(1, len(temp) - 1):
                temp[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(temp)
        return res[rowIndex]


# test
numRows = 3
solution = Solution()
res = solution.getRow(numRows)
print(res)