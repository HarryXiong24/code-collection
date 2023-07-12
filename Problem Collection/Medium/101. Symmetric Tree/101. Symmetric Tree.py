# 101. Symmetric Tree

# Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

# Example 1:
# Input: root = [1,2,2,3,4,4,3]
# Output: true

# Example 2:
# Input: root = [1,2,2,null,3,null,3]
# Output: false

# Definition for a binary tree node.
from typing import Optional


class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:

    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if root == None:
            return True

        def recursive(left: Optional[TreeNode],
                      right: Optional[TreeNode]) -> bool:
            if left == None and right == None:
                return True

            if left and right:
                if left.val != right.val:
                    return False
                return recursive(left.left, right.right) and recursive(
                    left.right, right.left)
            else:
                return False

        return recursive(root.left, root.right)
