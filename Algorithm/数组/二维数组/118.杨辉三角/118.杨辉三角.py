# 118 杨辉三角

# 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行
# 在「杨辉三角」中，每个数是它左上方和右上方的数的和

# 示例 1:
# 输入: numRows = 5
# 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

# 示例 2:
# 输入: numRows = 1
# 输出: [[1]]

from typing import List


class Solution:

    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            temp = []
            for fill in range(i + 1):
                temp.append(1)
            for j in range(1, len(temp) - 1):
                temp[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(temp)
        return res


# test
numRows = 5
solution = Solution()
res = solution.generate(numRows)
print(res)