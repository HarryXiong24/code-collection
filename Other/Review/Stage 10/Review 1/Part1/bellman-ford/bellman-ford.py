from math import inf
from collections import deque

def bellman_ford_spfa(graph, start, end):
    """
    SPFA (Queue-optimized Bellman–Ford) with Set-based in-queue tracking.
    graph: dict[str, dict[str, float]]
    start: str
    end: str
    """
    nodes = list(graph.keys())

    # 初始化
    distance_map = {node: inf for node in nodes}
    predecessor_map = {node: None for node in nodes}
    relax_count = {node: 0 for node in nodes}
    in_queue = set()

    distance_map[start] = 0
    queue = deque([start])
    in_queue.add(start)
    relax_count[start] = 1

    while queue:
        current_node = queue.popleft()
        in_queue.discard(current_node)

        for neighbor, weight in graph.get(current_node, {}).items():
            current_cost = distance_map[current_node]
            if current_cost != inf and current_cost + weight < distance_map[neighbor]:
                # 松弛
                distance_map[neighbor] = current_cost + weight
                predecessor_map[neighbor] = current_node
                relax_count[neighbor] += 1

                # 负环检测
                if relax_count[neighbor] >= len(nodes):
                    raise ValueError("Negative cycle detected (reachable from start)")

                if neighbor not in in_queue:
                    queue.append(neighbor)
                    in_queue.add(neighbor)

    # 如果目标不可达
    if distance_map[end] == inf:
        return [], inf

    # 恢复路径
    shortest_path = []
    def get_path(node):
        if not node:
            return
        shortest_path.append(node)
        get_path(predecessor_map[node])

    get_path(end)
    return list(reversed(shortest_path)), distance_map[end]


# ===== 测试 =====
graph1 = {
    "A": {"B": 1, "C": 1, "D": 3},
    "B": {"A": 1, "D": 2, "E": 1},
    "C": {"A": 1, "D": 1},
    "D": {"A": 2, "B": 3, "C": 1, "E": 2},
    "E": {"B": 1, "D": 2},
}
print("res1:", bellman_ford_spfa(graph1, "A", "E"))

graph2 = {
    "S": {"A": 4, "B": 5},
    "A": {"C": -2},
    "B": {"C": 3},
    "C": {"T": 2},
    "T": {},
}
print("res2:", bellman_ford_spfa(graph2, "S", "T"))

graph3 = {
    "X": {"Y": 1},
    "Y": {},
    "Z": {},  # isolated
}
print("res3:", bellman_ford_spfa(graph3, "X", "Z"))

graph4 = {
    "S": {"A": 1},
    "A": {"B": 1},
    "B": {"C": 1},
    "C": {"A": -4},  # negative cycle
}
try:
    print("res4:", bellman_ford_spfa(graph4, "S", "C"))
except ValueError as e:
    print("res4 throws:", str(e))
