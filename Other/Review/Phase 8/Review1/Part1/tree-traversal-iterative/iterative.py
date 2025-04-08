from typing import Any, List


class TreeNode:
    def __init__(self, val, left=None, right=None) -> None:
        self.val: Any = val
        self.left: TreeNode | None = left
        self.right: TreeNode | None = right


def preorder(root: TreeNode) -> List[int]:
    result: List[int] = []
    stack: List[TreeNode] = []

    if not root:
        return result

    stack.append(root)

    while stack:
        current = stack.pop()

        result.append(current.val)

        current.right and stack.append(current.right)
        current.left and stack.append(current.left)

    return result


def postorder(root: TreeNode) -> List[int]:
    result: List[int] = []
    stack: List[TreeNode] = []

    if not root:
        return result

    stack.append(root)

    while stack:
        current = stack.pop()

        result.append(current.val)

        current.left and stack.append(current.left)
        current.right and stack.append(current.right)

    result.reverse()
    return result


def inorder(root: TreeNode) -> List[int]:
    result: List[int] = []
    stack: List[TreeNode] = []

    if not root:
        return result

    node = root

    while node or len(stack) > 0:
        if node:
            stack.append(node)
            node = node.left
        else:
            node = stack.pop()
            result.append(node.val)
            node = node.right

    return result


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

res1 = preorder(root)
print(res1)

res2 = postorder(root)
print(res2)

res3 = inorder(root)
print(res3)

# Output:
# [1, 2, 4, 5, 3, 6, 7]
# [4, 5, 2, 7, 6, 3, 1]
# [4, 2, 5, 1, 7, 6, 3]
