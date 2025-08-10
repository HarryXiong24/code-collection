# 217 存在重复元素

# 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。

# 示例 1：
# 输入：nums = [1,2,3,1]
# 输出：true

# 示例 2：
# 输入：nums = [1,2,3,4]
# 输出：false

# 示例 3：
# 输入：nums = [1,1,1,3,3,4,3,2,4,2]
# 输出：true

from typing import List


class Solution:

    def containsDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                return True
        return False


# test
arr = [1, 2, 3, 1]
solution = Solution()
res = solution.containsDuplicate(arr)
print(res)