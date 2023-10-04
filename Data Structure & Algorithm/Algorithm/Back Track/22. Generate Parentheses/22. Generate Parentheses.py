# 22. Generate Parentheses

# Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

# Example 1:
# Input: n = 3
# Output: ["((()))","(()())","(())()","()(())","()()()"]

# Example 2:
# Input: n = 1
# Output: ["()"]

from typing import List


class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res: List[str] = []

        def backtrack(s: List[str], left: int, right: int):
            if len(s) == 2 * n:
                res.append(''.join(s))
                return

            if left < n:
                s.append('(')
                backtrack(s, left + 1, right)
                s.pop()

            if right < left:
                s.append(')')
                backtrack(s, left, right + 1)
                s.pop()

        backtrack([], 0, 0)
        return res


# test
solution = Solution()
res = solution.generateParenthesis(3)
print(res)
