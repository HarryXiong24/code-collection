# 1020. Number of Enclaves

# You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

# A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

# Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

# Example 1:
# Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
# Output: 3
# Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.

# Example 2:
# Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
# Output: 0
# Explanation: All 1s are either on the boundary or can reach the boundary.

from typing import List


class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]
        result = 0
        flag = True

        def recursive(i, j, count: List[str]):
            nonlocal flag
            if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]):
                return
            if grid[i][j] == 0:
                return
            if i == 0 or i == len(grid)-1 or j == 0 or j == len(grid[0]) - 1:
                flag = False
                return
            count.append(f"row{i}-col{j}")
            grid[i][j] = 0
            for item in directions:
                recursive(i + item[0], j + item[1], count)

        for i in range(0, len(grid)):
            for j in range(0, len(grid[0])):
                if grid[i][j] == 1:
                    count = []
                    flag = True
                    recursive(i, j, count)
                    if flag:
                        result = result + len(count)

        return result


# test
grid = [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
]
solution = Solution()
res = solution.numEnclaves(grid)
print(res)
