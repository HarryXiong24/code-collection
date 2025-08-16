from collections import deque, defaultdict
from math import inf
from typing import Dict, List, Tuple, Optional

EdgeMap = Dict[str, float]
Graph = Dict[str, EdgeMap]


def bellman_ford(graph: Graph, start: str, end: str) -> Tuple[List[str], float]:
    """
    Queue-based Bellman-Ford (SPFA-style).
    Returns (shortest_path_nodes, distance). If unreachable, returns ([], inf).
    Raises ValueError if a negative cycle is reachable from start.
    """
    nodes = list(graph.keys())

    dist: Dict[str, float] = {node: inf for node in nodes}
    prev: Dict[str, Optional[str]] = {node: None for node in nodes}
    # count[v] = how many times v has been relaxed (used for negative cycle detection)
    count: Dict[str, int] = defaultdict(int)

    q: deque[str] = deque()
    in_queue: Dict[str, bool] = {node: False for node in nodes}

    # init
    if start not in graph:
        return ([], inf)
    dist[start] = 0.0
    q.append(start)
    in_queue[start] = True

    while q:
        u = q.popleft()
        in_queue[u] = False

        for v, w in (graph.get(u) or {}).items():
            if dist[u] != inf and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u

                count[v] += 1
                if count[v] > len(nodes):
                    raise ValueError("Negative cycle detected (reachable from start)")

                if not in_queue[v]:
                    q.append(v)
                    in_queue[v] = True

    if dist[end] == inf:
        return ([], inf)

    path: List[str] = []
    cur: Optional[str] = end
    while cur is not None:
        path.append(cur)
        cur = prev[cur]
    path.reverse()
    return (path, dist[end])


# tests (与原 TS 示例一致)
graph1: Graph = {
    "A": {"B": 1, "C": 1, "D": 3},
    "B": {"A": 1, "D": 2, "E": 1},
    "C": {"A": 1, "D": 1},
    "D": {"A": 2, "B": 3, "C": 1, "E": 2},
    "E": {"B": 1, "D": 2},
}

# Expect
print("res1:", bellman_ford(graph1, "A", "E"))

graph2: Graph = {
    "S": {"A": 4, "B": 5},
    "A": {"C": -2},
    "B": {"C": 3},
    "C": {"T": 2},
    "T": {},
}
print("res2:", bellman_ford(graph2, "S", "T"))

graph3: Graph = {
    "X": {"Y": 1},
    "Y": {},
    "Z": {},  # isolated
}
print("res3:", bellman_ford(graph3, "X", "Z"))

graph4: Graph = {
    "S": {"A": 1},
    "A": {"B": 1},
    "B": {"C": 1},
    "C": {"A": -4},
}
try:
    print("res4:", bellman_ford(graph4, "S", "C"))
except Exception as e:
    print("res4 throws:", str(e))
