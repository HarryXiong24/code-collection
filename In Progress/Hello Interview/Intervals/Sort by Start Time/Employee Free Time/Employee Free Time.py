# DESCRIPTION (inspired by Leetcode.com)
# Write a function to find the common free time for all employees from a list called schedule. Each employee's schedule is represented by a list of non-overlapping intervals sorted by start times. The function should return a list of finite, non-zero length intervals where all employees are free, also sorted in order.

# Input:
# schedule = [[[2,4],[7,10]],[[1,5]],[[6,9]]]

# Output:
# [(5,6)]

# Explanation: The three employees collectively have only one common free time interval, which is from 5 to 6.

# Time Complexity: O(n log n), because we are sorting the intervals
# Space Complexity: O(n), because we are creating a new array to store the merged intervals
class Solution:
    def employeeFreeTime(self, schedule: list[list[list[int]]]) -> list[list[int]]:
        # Your code goes here
        intervals = []
        for employee_schedule in schedule:
            intervals.extend(employee_schedule)

        intervals.sort(key=lambda x: x[0])
        merged = []

        for interval in intervals:
            if len(merged) == 0 or merged[len(merged) - 1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[len(merged) - 1][1] = max(
                    merged[len(merged) - 1][1], interval[1]
                )

        free_time = []
        for i in range(len(merged) - 1):
            free_time.append((merged[i][1], merged[i + 1][0]))

        return free_time


# test
res = Solution().employeeFreeTime([[[2, 4], [7, 10]], [[1, 5]], [[6, 9]]])
print(res)
