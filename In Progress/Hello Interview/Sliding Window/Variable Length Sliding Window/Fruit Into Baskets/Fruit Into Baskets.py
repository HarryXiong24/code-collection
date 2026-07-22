# DESCRIPTION (inspired by Leetcode.com)
# Write a function to calculate the maximum number of fruits you can collect from an integer array fruits, where each element represents a type of fruit. You can start collecting fruits from any position in the array, but you must stop once you encounter a third distinct type of fruit. The goal is to find the longest subarray where at most two different types of fruits are collected.
# Example:
# Input: fruits = [3, 3, 2, 1, 2, 1, 0]
# Output: 4
# Explanation: We can pick up 4 fruit from the subarray [2, 1, 2, 1]

# Time Complexity: O(n)
# Space Complexity: O(1), since the map never contains more than 3 keys.
class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        max_fruits = 0
        fruits_map = dict({})
        left = 0

        for right in range(0, len(fruits)):
            if len(fruits_map) <= 2:
                if fruits[right] not in fruits_map:
                    fruits_map[fruits[right]] = 1
                fruits_map[fruits[right]] += 1
                max_fruits = max(max_fruits, right - left + 1)
            else:
                fruits_map[fruits[left]] -= 1
                if fruits_map[fruits[left]] == 0:
                    del fruits_map[fruits[left]]
                left += 1

        return max_fruits


# test
result = Solution().totalFruit([3, 3, 2, 1, 2, 1, 0])
print(result)
