# 1089. Duplicate Zeros

# Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.

# Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

# Example 1:
# Input: arr = [1,0,2,3,0,4,5,0]
# Output: [1,0,0,2,3,0,0,4]
# Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

# Example 2:
# Input: arr = [1,2,3]
# Output: [1,2,3]
# Explanation: After calling your function, the input array is modified to: [1,2,3]

from typing import List


class Solution:

    def duplicateZeros(self, arr: List[int]) -> None:
        """
        Do not return anything, modify arr in-place instead.
        """
        count = 0
        flag = 0
        copy_from = 0

        # find out which element is the end after duplicating
        for i in range(len(arr)):
            if count >= len(arr):
                break
            if arr[i] == 0:
                count = count + 2
            else:
                count = count + 1
            copy_from = i

        copy_to = len(arr) - 1
        flag = 1 if count > len(arr) else 0

        while copy_to >= 0:
            if arr[copy_from] == 0 and flag == 0:
                arr[copy_to] = arr[copy_from]
                arr[copy_to - 1] = 0
                copy_to -= 1
            elif arr[copy_from] == 0 and flag == 1:
                arr[copy_to] = arr[copy_from]
                flag = 0
            else:
                arr[copy_to] = arr[copy_from]
            copy_to -= 1
            copy_from -= 1


# test
arr = [1, 0, 2, 3, 0, 4, 5, 0]
solution = Solution()
solution.duplicateZeros(arr)
print(arr)