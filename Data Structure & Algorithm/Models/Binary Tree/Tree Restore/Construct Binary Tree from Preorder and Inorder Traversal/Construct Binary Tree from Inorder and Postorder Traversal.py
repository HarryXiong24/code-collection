from typing import List, Optional


class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:

    def buildTree(self, preorder: List[int],
                  inorder: List[int]) -> Optional[TreeNode]:

        def recursive(preorder: List[int],
                      inorder: List[int]) -> Optional[TreeNode]:
            if len(preorder) <= 0 or len(inorder) <= 0:
                return None

            currentVal = preorder.pop(0)
            currentIndex = inorder.index(currentVal)
            node = TreeNode(currentVal)

            node.left = recursive(preorder, inorder[0:currentIndex])
            node.right = recursive(preorder, inorder[currentIndex + 1:])

            return node

        return recursive(preorder, inorder)


# test
def levelOrder(root: TreeNode | None) -> List[int]:
    res = []
    queue = []

    if root == None:
        return res

    queue.append(root)
    while (len(queue) > 0):
        size = len(queue)
        for _ in range(size):
            current = queue.pop(0)
            res.append(current.val)
            if (current.left):
                queue.append(current.left)
            if (current.right):
                queue.append(current.right)
    return res


preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
solution = Solution()
res = solution.buildTree(preorder, inorder)
printTree = levelOrder(res)
print(printTree)
