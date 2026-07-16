from typing import List, Optional


class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:

    def buildTree(
        self,
        inorder: List[int],
        postorder: List[int],
    ) -> Optional[TreeNode]:

        def recursive(
            inorder: List[int],
            postorder: List[int],
        ) -> Optional[TreeNode]:
            if len(postorder) <= 0 or len(inorder) <= 0:
                return None

            currentVal = postorder.pop()
            currentIndex = inorder.index(currentVal)
            node = TreeNode(currentVal)

            node.right = recursive(inorder[currentIndex + 1:], postorder)
            node.left = recursive(inorder[0:currentIndex], postorder)

            return node

        return recursive(inorder, postorder)


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


inorder = [9, 3, 15, 20, 7]
postorder = [9, 15, 7, 20, 3]
solution = Solution()
res = solution.buildTree(inorder, postorder)
printTree = levelOrder(res)
print(printTree)
