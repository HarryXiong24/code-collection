# 100. Same Tree

# Given the roots of two binary trees p and q, write a function to check if they are the same or not.

# Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

# Example 1:
# Input: p = [1,2,3], q = [1,2,3]
# Output: true

# Example 2:
# Input: p = [1,2], q = [1,null,2]
# Output: false

# Example 3:
# Input: p = [1,2,1], q = [1,1,2]
# Output: false

# Definition for a binary tree node.
from typing import Optional


class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:

    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:

        def recursive(node_p: Optional[TreeNode],
                      node_q: Optional[TreeNode]) -> bool:
            if node_p == None and node_q == None:
                return True
            elif node_p and node_q:
                if node_p.val != node_q.val:
                    return False
                return recursive(node_p.left, node_q.left) and recursive(
                    node_p.right, node_q.right)
            else:
                return False

        return recursive(p, q)
