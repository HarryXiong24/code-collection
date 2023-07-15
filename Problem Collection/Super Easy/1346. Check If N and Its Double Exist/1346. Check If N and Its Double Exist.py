# 1346. Check If N and Its Double Exist

# Given an array arr of integers, check if there exist two indices i and j such that :

# i != j
# 0 <= i, j < arr.length
# arr[i] == 2 * arr[j]

# Example 1:
# Input: arr = [10,2,5,3]
# Output: true
# Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]

# Example 2:
# Input: arr = [3,1,7,11]
# Output: false
# Explanation: There is no i and j that satisfy the conditions.

from typing import List


class Solution:

    def checkIfExist(self, arr: List[int]) -> bool:
        map = {}
        for i in range(len(arr)):
            map[arr[i] * 2] = i

        for i in range(len(arr)):
            if arr[i] in map and i != map[arr[i]]:
                return True

        return False


# test
solution = Solution()
res = solution.checkIfExist([10, 2, 5, 3])
print(res)
