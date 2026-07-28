# DESCRIPTION (inspired by Leetcode.com)
# Write a function to return the minimum number of intervals that must be removed from a given array intervals, where intervals[i] consists of a starting point start i and an ending point end i, to ensure that the remaining intervals do not overlap.

# Input:
# intervals = [[1,3],[5,8],[4,10],[11,13]]

# Output: 1
# Explanation: Removing the interval [4,10] leaves all other intervals non-overlapping.

# Time Complexity: O(n log n), because we are sorting the intervals
# Space Complexity: O(1)
class Solution:
    def nonOverlappingIntervals(self, intervals: list[list[int]]) -> int:
        # Your code goes here
        intervals.sort(key=lambda x: x[1])
        count = 0
        pre = []

        for index, interval in enumerate(intervals):
            if index == 0 or pre[1] <= interval[0]:
                pre = interval
                count += 1

        return len(intervals) - count


# test
res = Solution().nonOverlappingIntervals([[1, 3], [5, 8], [4, 10], [11, 13]])
print(res)
