from typing import Any, List


class TreeNode:

    def __init__(self, val, left=None, right=None) -> None:
        self.val: Any = val
        self.left: TreeNode | None = left
        self.right: TreeNode | None = right


def levelOrder(root: TreeNode) -> List[Any]:
    res = []
    queue: List[TreeNode] = []

    if root == None:
        return res

    queue.append(root)
    while len(queue) > 0:
        size = len(queue)
        temp = []
        for _ in range(size):
            current = queue.pop(0)
            temp.append(current.val)
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
        res.append(temp)

    return res


# test
root = TreeNode(1)
node2 = TreeNode(2)
node3 = TreeNode(3)
node4 = TreeNode(4)
node5 = TreeNode(5)
node6 = TreeNode(6)
node7 = TreeNode(7)

root.left = node2
root.right = node3
node2.left = node4
node2.right = node5
node3.left = node6
node6.left = node7

res = levelOrder(root)
print(res)