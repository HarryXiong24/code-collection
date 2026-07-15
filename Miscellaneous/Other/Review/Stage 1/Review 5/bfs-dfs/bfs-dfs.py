from typing import List


class TestNode:

    def __init__(self, value: int = 0, neighbors: List = []):
        self.value: int = value
        self.neighbors: List[TestNode] = neighbors


def BFS(root: TestNode):
    if not root:
        return

    queue = [root]
    depth = 0

    while len(queue):

        size = len(queue)

        for _ in range(size):
            current = queue.pop(0)
            print(current.value)
            for neighbor in current.neighbors:
                queue.append(neighbor)

        depth += 1

    return depth


def DFS_Stack(root: TestNode):
    if not root:
        return

    stack = [root]

    while len(stack):

        current = stack.pop()
        print(current.value)

        for neighbor in current.neighbors:
            stack.append(neighbor)


def DFS_Recursive(root: TestNode):
    if not root:
        return

    def recursion(node: TestNode):
        if not node:
            return
        print(node.value)
        for neighbor in node.neighbors:
            recursion(neighbor)

    recursion(root)


# test
root = TestNode(1, [])
node2 = TestNode(2, [])
node3 = TestNode(3, [])
node4 = TestNode(4, [])
node5 = TestNode(5, [])
node6 = TestNode(6, [])
node7 = TestNode(7, [])

root.neighbors.append(node2)
root.neighbors.append(node3)
node2.neighbors.append(node4)
node2.neighbors.append(node5)
node3.neighbors.append(node6)
node6.neighbors.append(node7)

res = BFS(root)
print(f"depth: {res}")

print("------")

DFS_Stack(root)

print("------")

DFS_Recursive(root)
