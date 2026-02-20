# 11 盛最多水的容器

# 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai)
# 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)
# 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
# 说明：你不能倾斜容器

# 输入：[1,8,6,2,5,4,8,3,7]
# 输出：49
# 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]
# 在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49

# 思路：容纳的水量 = 两个指针指向的数字中较小值 * 指针之间的距离
from typing import List


class Solution:

    def maxArea(self, height: List[int]) -> int:
        left = 0
        right = len(height) - 1
        maxArea = 0
        while left < right:
            temp = min(height[left], height[right]) * (right - left)
            if temp > maxArea:
                maxArea = temp
            if min(height[left], height[right]) == height[left]:
                left = left + 1
            else:
                right = right - 1

        return maxArea


# test
arr = [1, 8, 6, 2, 5, 4, 8, 3, 7]
solution = Solution()
res = solution.maxArea(arr)
print(res)
