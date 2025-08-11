# 236. Lowest Common Ancestor of a Binary Tree

# Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

# According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

# Example 1:
# Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
# Output: 3
# Explanation: The LCA of nodes 5 and 1 is 3.

# Example 2:
# Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
# Output: 5
# Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according
# to the LCA definition.

# Example 3:
# Input: root = [1,2], p = 1, q = 2
# Output: 1


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root:
        return None

    def recursion(node: TreeNode) -> TreeNode:
        if not node:
            return None

        if not p or not q:
            return None

        if node.val == p.val or node.val == q.val:
            return node

        left_result = recursion(node.left)
        right_result = recursion(node.right)

        if not left_result and not right_result:
            return None
        elif left_result and not right_result:
            return left_result
        elif not left_result and right_result:
            return right_result
        else:
            return node

    return recursion(root)
