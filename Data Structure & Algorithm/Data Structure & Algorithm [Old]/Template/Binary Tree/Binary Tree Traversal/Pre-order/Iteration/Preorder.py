from typing import Any, List


class TreeNode:

    def __init__(self, val, left=None, right=None) -> None:
        self.val: Any = val
        self.left: TreeNode | None = left
        self.right: TreeNode | None = right


def preorderTraversalIterative(root: TreeNode) -> List[Any]:
    res = []
    stack: List[TreeNode] = []

    if root == None:
        return res

    node = root

    while len(stack) > 0 or node:
        while node:
            res.append(node.val)
            stack.append(node)
            node = node.left

        node = stack.pop()
        node = node.right

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

res = preorderTraversalIterative(root)
print(res)