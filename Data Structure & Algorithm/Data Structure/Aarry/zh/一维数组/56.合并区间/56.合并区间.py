# 56 合并区间

# 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
# 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间

# 示例 1：
# 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
# 输出：[[1,6],[8,10],[15,18]]
# 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

# 示例 2：
# 输入：intervals = [[1,4],[4,5]]
# 输出：[[1,5]]
# 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

# test
from typing import List


class Solution:

    def merge(self, intervals: List[List[int]]) -> List[List[int]]:

        def sortArr(x: List[int]):
            return x[0]

        res: List[List[int]] = []

        if len(intervals) == 0 or len(intervals) == 1:
            return intervals

        intervals.sort(key=sortArr)

        left = intervals[0][0]
        right = intervals[0][1]

        for i in range(1, len(intervals)):
            item = intervals[i]
            if right < item[0]:
                res.append([left, right])
                left = item[0]
                right = item[1]
            else:
                left = min(left, item[0])
                right = max(right, item[1])

        # 最后别忘了把最后一个区间也要 push 进去
        res.append([left, right])

        return res


# test
arr1 = [
    [1, 3],
    [2, 6],
    [8, 10],
    [9, 18],
]
arr2 = [
    [4, 5],
    [1, 4],
]
solution = Solution()
res1 = solution.merge(arr1)
res2 = solution.merge(arr2)
print(res1)
print(res2)
