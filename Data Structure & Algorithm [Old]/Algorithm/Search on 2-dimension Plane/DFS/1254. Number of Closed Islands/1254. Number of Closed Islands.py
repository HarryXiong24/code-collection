# 1254. Number of Closed Islands

# Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

# Return the number of closed islands.

# Example 1:
# Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
# Output: 2
# Explanation:
# Islands in gray are closed because they are completely surrounded by water (group of 1s).

# Example 2:
# Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
# Output: 1

# Example 3:
# Input: grid = [[1,1,1,1,1,1,1],
#                [1,0,0,0,0,0,1],
#                [1,0,1,1,1,0,1],
#                [1,0,1,0,1,0,1],
#                [1,0,1,1,1,0,1],
#                [1,0,0,0,0,0,1],
#                [1,1,1,1,1,1,1]]
# Output: 2

from typing import List


class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]
        result = 0

        def recursive(i, j):
            nonlocal flag
            if i < 0 or i > len(grid) - 1 or j < 0 or j > len(grid[0]) - 1:
                return
            if grid[i][j] == 1:
                return
            if i == 0 or i == len(grid) - 1 or j == 0 or j == len(grid[0]) - 1:
                flag = False
                return
            grid[i][j] = 1
            for item in directions:
                recursive(i + item[0], j + item[1])

        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 0:
                    flag = True
                    recursive(i, j)
                    if flag:
                        result += 1

        return result


# test
grid = [
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0],
]
solution = Solution()
res = solution.closedIsland(grid)
print(res)
