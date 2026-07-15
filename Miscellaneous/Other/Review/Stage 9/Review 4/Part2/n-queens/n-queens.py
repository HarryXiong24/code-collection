# 51. N-Queens

# The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

# Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

# Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

# Example 1:
# Input: n = 4
# Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
# Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

# Example 2:
# Input: n = 1
# Output: [["Q"]]


def solveNQueens(n: int) -> list[list[str]]:
    results = []
    chessboard = [["." for _ in range(n)] for _ in range(n)]

    def isValid(row: int, col: int, chessboard: list[list[str]]) -> bool:
        # Check the column
        for i in range(row):
            if chessboard[i][col] == "Q":
                return False

        # Check the 45-degree diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if chessboard[i][j] == "Q":
                return False
            i -= 1
            j -= 1

        # Check the 135-degree diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < len(chessboard[i]):
            if chessboard[i][j] == "Q":
                return False
            i -= 1
            j += 1

        return True

    def backtrack(chessboard: list[list[str]], row: int):
        if row == n:
            temp = ["".join(item) for item in chessboard]
            results.append(temp)
            return

        for col in range(n):
            if not isValid(row, col, chessboard):
                continue

            chessboard[row][col] = "Q"
            backtrack(chessboard, row + 1)
            chessboard[row][col] = "."

    backtrack(chessboard, 0)

    return results


# Test
res = solveNQueens(4)
for solution in res:
    for row in solution:
        print(row)
    print()
