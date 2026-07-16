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

    def generateParenthesis_recursion(self, n: int) -> List[str]:
        result: List[str] = []

        def recursion(current_str: str, left: int, right: int):
            if right < left:
                return

            if left == 0 and right == 0:
                result.append(current_str)

            if left != 0:
                recursion(current_str + "(", left - 1, right)

            if right != 0:
                recursion(current_str + ")", left, right-1)

        recursion('', n, n)
        return result


# test
solution = Solution()
res = solution.generateParenthesis(3)
res1 = solution.generateParenthesis_recursion(3)
print(res)
print(res1)
