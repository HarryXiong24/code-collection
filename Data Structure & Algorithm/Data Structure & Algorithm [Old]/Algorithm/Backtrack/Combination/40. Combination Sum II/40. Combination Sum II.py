# 40. Combination Sum II

# Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

# Each number in candidates may only be used once in the combination.

# Note: The solution set must not contain duplicate combinations.

# Example 1:
# Input: candidates = [10,1,2,7,6,1,5], target = 8
# Output:
# [
# [1,1,6],
# [1,2,5],
# [1,7],
# [2,6]
# ]

# Example 2:
# Input: candidates = [2,5,2,1,2], target = 5
# Output:
# [
# [1,2,2],
# [5]
# ]

from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        results: List[List[int]] = []
        result = []

        candidates.sort()

        def back_track(current_sum: int, current_index: int, result: List[int]):
            if current_sum == target:
                results.append(result[:])
                return

            if current_sum > target or current_index >= len(candidates):
                return

            result.append(candidates[current_index])
            back_track(current_sum +
                       candidates[current_index], current_index + 1, result)
            result.pop()

            while current_index + 1 < len(candidates) and candidates[current_index] == candidates[current_index + 1]:
                current_index += 1
            back_track(current_sum, current_index + 1, result)

        back_track(0, 0, result)

        return results


# test
solution = Solution()
res = solution.combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
print(res)
