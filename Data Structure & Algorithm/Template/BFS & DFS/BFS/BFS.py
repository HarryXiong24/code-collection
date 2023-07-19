from typing import Any, List


class TestNode:

    def __init__(self, value: Any = 0, neighbors: List = []):
        self.value: Any = value
        self.neighbors: List[TestNode] = neighbors


def BFS(root: TestNode) -> int:
    queue: List[TestNode] = [root]
    layer = 0

    while len(queue) > 0:
        size = len(queue)
        for _ in range(size):
            current = queue[0]
            if current:
                print(current.value)
            if len(current.neighbors) > 0:
                for item in current.neighbors:
                    queue.append(item)
            queue.pop(0)
        layer = layer + 1

    return layer


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
print(f"layer: {res}")
