# 946. Validate Stack Sequences

# Given two integer arrays pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack, or false otherwise.

# Example 1:
# Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
# Output: true
# Explanation: We might do the following sequence:
# push(1), push(2), push(3), push(4),
# pop() -> 4,
# push(5),
# pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

# Example 2:
# Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
# Output: false
# Explanation: 1 cannot be popped before 2.


from typing import List


class Solution:
    def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:
        stack = []
        i = 0
        for item in pushed:
            stack.append(item)
            if len(stack) > 0 and stack[len(stack)-1] == popped[i]:
                while len(stack) > 0 and stack[len(stack)-1] == popped[i]:
                    i += 1
                    stack.pop()
        return len(stack) == 0


# test
solution = Solution()
res1 = solution.validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1])
res2 = solution.validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2])
print(res1)
print(res2)
