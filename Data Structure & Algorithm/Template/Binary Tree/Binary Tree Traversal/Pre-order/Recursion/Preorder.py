from typing import Any, List


class TreeNode:

    def __init__(self, val, left=None, right=None) -> None:
        self.val: Any = val
        self.left: TreeNode | None = left
        self.right: TreeNode | None = right


def preorderTraversalRecursive(root: TreeNode) -> List[Any]:
    res = []

    def recursive(node: TreeNode):
        if node == None:
            return

        res.append(node.val)
        recursive(node.left)
        recursive(node.right)

    recursive(root)
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

res = preorderTraversalRecursive(root)
print(res)