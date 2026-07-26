# DESCRIPTION (inspired by Leetcode.com)
# Given a list of intervals intervals and an interval newInterval, write a function to insert newInterval into a list of existing, non-overlapping, and sorted intervals based on their starting points. The function should ensure that after the new interval is added, the list remains sorted without any overlapping intervals, merging them if needed.

# Input:
# intervals = [[1,3],[6,9]]
# newInterval = [2,5]

# Output:
# [[1,5],[6,9]]
# Explanation: The new interval [2,5] overlaps with [1,3], so they are merged into [1,5].

# Time Complexity: O(n log n), because we are sorting the intervals
# Space Complexity: O(n), because we are creating a new array to store the merged intervals
class Solution:
    def insertIntervals(
        self, intervals: list[list[int]], newInterval: list[int]
    ) -> list[list[int]]:
        # Your code goes here
        intervals.append(newInterval)
        intervals.sort(key=lambda x: x[0])

        merged = []

        for interval in intervals:
            if len(merged) == 0 or merged[len(merged) - 1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[len(merged) - 1][1] = max(
                    merged[len(merged) - 1][1], interval[1]
                )

        return merged


# test
res = Solution().insertIntervals([[1, 3], [6, 9]], [2, 5])
print(res)
