# 655. Print Binary Tree

# Given the root of a binary tree, construct a 0-indexed m x n string matrix res that represents a formatted layout of the tree. The formatted layout matrix should be constructed using the following rules:

# The height of the tree is height and the number of rows m should be equal to height + 1.
# The number of columns n should be equal to 2height+1 - 1.
# Place the root node in the middle of the top row (more formally, at location res[0][(n-1)/2]).
# For each node that has been placed in the matrix at position res[r][c], place its left child at res[r+1][c-2height-r-1] and its right child at res[r+1][c+2height-r-1].
# Continue this process until all the nodes in the tree have been placed.
# Any empty cells should contain the empty string "".
# Return the constructed matrix res.

# Example 1:
# Input: root = [1,2]
# Output: 
# [["","1",""],
#  ["2","",""]]

# Example 2:
# Input: root = [1,2,3,null,4]
# Output: 
# [["","","","1","","",""],
#  ["","2","","","","3",""],
#  ["","","4","","","",""]]

# Definition for a binary tree node.
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def BFS(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0;
        height = 0;
        queue = [root];
        
        while len(queue):
          size = len(queue)
          for _ in range(0, size):
            cur = queue.pop(0);
            cur.left and queue.append(cur.left)
            cur.right and queue.append(cur.right)
          height = height + 1
        
        return height-1
  
    def printTree(self, root: Optional[TreeNode]) -> List[List[str]]:
        if not root:
            return None;
          
        height = self.BFS(root)
        m = height + 1;
        n = 2 ** m - 1;
        first = [""] * n
        first[(n-1) // 2] = str(root.val);
        res = [first]
        
        queue = [[root, 0, (n-1) // 2]]
        
        while len(queue):
            size = len(queue)
            nextCol = [""] * n
            for _ in range(0, size):
              cur, r, c = queue.pop(0);
              if cur.left: 
                nextCol[c-2**(height-r-1)] = str(cur.left.val)
                queue.append([cur.left, r+1, c-2**(height-r-1)])
              if cur.right:
                nextCol[c+2**(height-r-1)] = str(cur.right.val)
                cur.right and queue.append([cur.right, r+1, c+2**(height-r-1)])
            res.append(nextCol)
        
        return res[0: len(res)-1]
           
# test
treeNode1 = TreeNode(1, None, None)
treeNode2 = TreeNode(2, None, None)
treeNode3 = TreeNode(3, None, None)
treeNode4 = TreeNode(4, None, None)
treeNode1.left = treeNode2
treeNode1.right = treeNode3
treeNode2.right = treeNode4

solution = Solution()
height = solution.BFS(treeNode1)
print(height)
res = solution.printTree(treeNode1)
print(res)