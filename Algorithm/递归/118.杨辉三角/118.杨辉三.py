# 118 杨辉三角

# 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行
# 在「杨辉三角」中，每个数是它左上方和右上方的数的和

# 示例 1:
# 输入: numRows = 5
# 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

from typing import List


class Solution:

    def generate(self, numRows: int) -> List[List[int]]:
        result = []
        self.add(result, numRows, 0)
        return result

    def add(self, result: List[int], numRows: int, level: int) -> None:
        # 终止条件
        if numRows == level:
            return []
        # 递归前
        newRow = [1] * (level + 1)
        if level - 1 <= 0:
            lastList = 1
        else:
            lastList = result[level - 1]
        for i in range(1, len(newRow) - 1):
            # 关系式
            newRow[i] = lastList[i - 1] + lastList[i]

        result.append(newRow)
        # 开始递归
        self.add(result, numRows, level + 1)


# test
solution = Solution()
res = solution.generate(5)
print(res)
