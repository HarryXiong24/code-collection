# 108. Convert Sorted Array to Binary Search Tree

# Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

# A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

# Example 1:
# Input: nums = [-10,-3,0,5,9]
# Output: [0,-3,9,-10,null,5]
# Explanation: [0,-10,5,null,-3,null,9] is also accepted:

# Example 2:
# Input: nums = [1,3]
# Output: [3,1]
# Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:

    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        if len(nums) == 0:
            return None

        def recursive(nums: List[int]) -> Optional[TreeNode]:
            if len(nums) == 0:
                return None
            centerIndex = len(nums) // 2

            return TreeNode(nums[centerIndex], recursive(nums[:centerIndex]),
                            recursive(nums[centerIndex + 1:]))

        return recursive(nums)