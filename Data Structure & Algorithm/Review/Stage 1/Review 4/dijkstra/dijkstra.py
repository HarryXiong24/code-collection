from typing import List


def dijkstra(
    graph: dict[str, dict[str, float]], start: int, end: int
) -> tuple[dict[str, float], int]:
    dijkstra_table: dict[str, float] = {node: float("infinity") for node in graph}
    record_path: dict[str, str] = {node: None for node in graph}
    visited = set({})

    # init
    dijkstra_table[start] = 0
    queue: List[List[str, int]] = [[start, 0]]

    while len(queue) > 0:
        queue.sort(key=lambda x: x[1])
        current_node, current_cost = queue.pop(0)

        if current_node in visited:
            continue
        visited.add(current_node)

        neighbors = graph[current_node]
        for neighbor in neighbors:
            weight = graph[current_node][neighbor]
            if current_cost + weight < dijkstra_table[neighbor]:
                dijkstra_table[neighbor] = current_cost + weight
                record_path[neighbor] = current_node
                queue.append([neighbor, current_cost + weight])

    def getShortestPath(node: str, result: List[str]):
        if not node:
            return
        result.append(node)
        getShortestPath(record_path[node], result)

    shortest_path: List[str] = []
    getShortestPath(end, shortest_path)
    shortest_path.reverse()

    return (shortest_path, dijkstra_table[end])


# test
graph = {
    "A": {"B": 1, "C": 1, "D": 3},
    "B": {"A": 1, "D": 2, "E": 1},
    "C": {"A": 1, "D": 1},
    "D": {"A": 2, "B": 3, "C": 1, "E": 2},
    "E": {"B": 1, "D": 2},
}
result, cost = dijkstra(graph, "A", "E")
print(result, cost)
