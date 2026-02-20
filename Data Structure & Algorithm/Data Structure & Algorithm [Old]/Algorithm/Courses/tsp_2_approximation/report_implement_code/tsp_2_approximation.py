import heapq

def prim(
    vertex_count: int, edge_count: int, edges: list[list[int, int, float]]
) -> tuple[int, list[list[int]], list[list[int, int, float]]]:
    cost = 0
    mst_path: list[tuple[int, int]] = []
    mst_edges: list[tuple[int, int, float]] = []

    # initialize
    count = vertex_count - 1
    visited = [False] * vertex_count
    heap: list[tuple[float, int, int]] = []  # (weight, u, v)

    # Adds the edge connected to node 0 to the heap
    for item in edges:
        if item[0] == 0 or item[1] == 0:
            heapq.heappush(heap, (item[2], item[0], item[1]))
    visited[0] = True

    while count > 0 and heap:
        # Removes the least weighted edge from the heap
        weight, u, v = heapq.heappop(heap)

        if not visited[u] or not visited[v]:
            mst_path.append((u, v))
            mst_edges.append((u, v, weight))
            cost += weight
            count -= 1

            # Identify the next unaccessed node
            next_node = u if not visited[u] else v
            visited[next_node] = True

            # Add all new edges associated with next_node to the heap
            for item in edges:
                if (item[0] == next_node and not visited[item[1]]) or (
                    item[1] == next_node and not visited[item[0]]
                ):
                    heapq.heappush(heap, (item[2], item[0], item[1]))

    return cost, mst_path, mst_edges


def dfs_traversal(
    mst: list[tuple[int, int, float]], vertex_count: int
) -> tuple[int, list[int], list[tuple[int, int, float]]]:
    # Depth-first traversal of MST is performed and the return path is recorded
    adj_list = {i: [] for i in range(vertex_count)}
    for u, v, weight in mst:
        adj_list[u].append((v, weight))
        adj_list[v].append((u, weight))

    visited = [False] * vertex_count
    dfs_cost = 0
    dfs_path = []  # Record the path of the traversed node
    dfs_edges = []  # Records information about traversed edges

    def dfs(node):
        nonlocal dfs_cost
        visited[node] = True
        # dfs_edges.append(node)  # Records the nodes accessed
        for neighbor, weight in adj_list[node]:
            if not visited[neighbor]:
                dfs_path.append(node)
                dfs_edges.append((node, neighbor, weight))  #  Records the edges
                dfs_cost += weight
                dfs(neighbor)
                dfs_path.append(neighbor)
                dfs_edges.append((neighbor, node, weight))  #loop
                dfs_cost += weight

    dfs(0)  # start from first vertex
    return (
        dfs_cost,
        dfs_path,
        dfs_edges,
    )


def optimize_path_with_triangle(
    dfs_edges: list[tuple[int, int, float]], edges: list[tuple[int, int, float]]
) -> tuple[int, list[int]]:
    """The DFS path is optimized to a Hamiltonian loop by the triangular inequality"""
    # Extracted the adjacency matrix
    max_vertex = max(max(u, v) for u, v, w in edges)
    adj_matrix = [[float("inf")] * (max_vertex + 1) for _ in range(max_vertex + 1)]
    for u, v, weight in edges:
        adj_matrix[u][v] = weight
        adj_matrix[v][u] = weight

    # Records the nodes that have been accessed
    visited = set()
    optimized_path = []
    optimized_cost = 0

    # Iterate the DFS path and optimize the loop
    for i in range(len(dfs_edges)):
        u, v, weight = dfs_edges[i]

        if u not in visited:
            optimized_path.append(u)  # Add the first node
            visited.add(u)

        if v not in visited:
            # Checking of triangle inequality
            if (
                len(optimized_path) > 1
                and adj_matrix[optimized_path[-1]][v]
                > adj_matrix[optimized_path[-1]][u] + adj_matrix[u][v]
            ):
                # If the direct connection between the current point and the next point is greater than the detour, the loop is taken
                optimized_cost += adj_matrix[optimized_path[-1]][u] + adj_matrix[u][v]
                optimized_path.append(u)  # back to u
            else:
                # add edge
                optimized_cost += adj_matrix[optimized_path[-1]][v]
                optimized_path.append(v)
                visited.add(v)

    # closed path
    if optimized_path and optimized_path[0] != optimized_path[-1]:
        optimized_cost += adj_matrix[optimized_path[-1]][optimized_path[0]]
        optimized_path.append(optimized_path[0])

    return optimized_cost, optimized_path

def tsp_2_approximation(n: int, m: int, edges: list[tuple[int, int, float]]):
    # Step 1: compute MST
    mst_cost, mst_path, mst_edges = prim(n, m, edges)
    print("mst_cost:", mst_cost)
    # print("mst_path:", mst_path)
    # print("mst_edges:", mst_edges)

    # Step 2: DFS for MST
    dfs_cost, dfs_path, dfs_edges = dfs_traversal(mst_edges, n)
    print("------")
    print("dfs_cost:", dfs_cost)
    # print("dfs_path:", dfs_path)
    # print("dfs_edges:", dfs_edges)

    # Step 3: optimized to the Hamiltonian loop using the triangle inequality
    triangle_optimize_cost, triangle_optimize_path = optimize_path_with_triangle(
        dfs_edges, edges
    )
    print("------")
    print("triangle_optimize_cost", triangle_optimize_cost)
    # print("triangle_optimize_path", triangle_optimize_path)

    # Step 4: result
    print("------") 
    print(
        f"cost(mst): {mst_cost} < triangle_optimize_cost: {triangle_optimize_cost} < 2 * cost(mst): {2*mst_cost}"
    )
