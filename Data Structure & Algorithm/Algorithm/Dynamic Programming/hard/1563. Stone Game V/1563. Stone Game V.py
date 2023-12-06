# 1563. Stone Game V

# There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

# In each round of the game, Alice divides the row into two non-empty rows (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice's score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.

# The game ends when there is only one stone remaining. Alice's is initially zero.

# Return the maximum score that Alice can obtain.

# Example 1:
# Input: stoneValue = [6,2,3,4,5,5]
# Output: 18
# Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11.
# In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5).
# The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.

# Example 2:
# Input: stoneValue = [7,7,7,7,7,7,7]
# Output: 28

# Example 3:
# Input: stoneValue = [4]
# Output: 0

from typing import List


class Solution:
    def stoneGameV(self, stoneValue: List[int]) -> int:
        preSum = [0]
        for i in range(0, len(stoneValue)):
            preSum.append(stoneValue[i] + preSum[-1])

        memo = [[-1 for _ in range(len(stoneValue))] for _ in range(len(stoneValue))]

        def recursive(l: int, r: int) -> int:
            if l == r:
                return 0

            if memo[l][r] != -1:
                return memo[l][r]

            res = 0
            for i in range(l, r):
                left = preSum[i + 1] - preSum[l]
                right = preSum[r + 1] - preSum[i + 1]

                if left < right:
                    res = max(res, recursive(l, i) + left)
                elif left > right:
                    res = max(res, recursive(i + 1, r) + right)
                else:
                    res = max(res, recursive(l, i) + left, recursive(i + 1, r) + right)

            memo[l][r] = res
            return res

        return recursive(0, len(stoneValue) - 1)

    def stoneGameV_DP(self, stoneValue: List[int]) -> int:
        n = len(stoneValue)
        if n == 1:
            return 0

        # Calculate prefix sum for efficient range sum calculation
        preSum = [0] * (n + 1)
        for i in range(n):
            preSum[i + 1] = preSum[i] + stoneValue[i]

        # Initialize DP table
        dp = [[0 for _ in range(n)] for _ in range(n)]

        # Fill the DP table bottom-up
        for length in range(2, n + 1):  # length of the current subarray
            for l in range(n - length + 1):  # left index of the subarray
                r = l + length - 1  # right index of the subarray
                for i in range(l, r):
                    left = preSum[i + 1] - preSum[l]
                    right = preSum[r + 1] - preSum[i + 1]

                    if left < right:
                        dp[l][r] = max(dp[l][r], dp[l][i] + left)
                    elif left > right:
                        dp[l][r] = max(dp[l][r], dp[i + 1][r] + right)
                    else:
                        dp[l][r] = max(dp[l][r], dp[l][i] + left, dp[i + 1][r] + right)

        return dp[0][n - 1]


# test
solution = Solution()
res = solution.stoneGameV([6, 2, 3, 4, 5, 5])
print(res)
