# 118. Pascal's Triangle

# Given an integer numRows, return the first numRows of Pascal's triangle.
# In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

# Example 1:
# Input: numRows = 5
# Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

# Example 2:
# Input: numRows = 1
# Output: [[1]]

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