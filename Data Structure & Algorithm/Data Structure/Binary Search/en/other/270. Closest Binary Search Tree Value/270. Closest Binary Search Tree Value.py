# 270. Closest Binary Search Tree Value

# Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.

# Example 1:
# Input: root = [4,2,5,1,3], target = 3.714286
# Output: 4

# Example 2:
# Input: root = [1], target = 4.428571
# Output: 1

# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        if not root:
            return 0

        result = float('inf')
        gap = result

        def recursive(node):
            nonlocal result, gap
            if not node:
                return
            if abs(node.val - target) < gap:
                gap = abs(node.val - target)
                result = node.val
            # If there are multiple answers, print the smallest.
            if abs(node.val - target) == gap:
                result = min(result, node.val)
            # Binary Search
            if target < node.val:
                recursive(node.left)
            elif target > node.val:
                recursive(node.right)
            else:
                result = node.val

        recursive(root)

        return result
