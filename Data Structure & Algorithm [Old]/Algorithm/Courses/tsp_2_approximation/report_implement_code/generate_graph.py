import math
import random

from utils import generate_file

def is_collinear(p1: float, p2: float, p3: float) -> bool:
    """
    Determine whether the three points are collinear.
    :param p1, p2, p3: coordinates of three points (x, y)
    :return: True if collinear, False otherwise
    """
    # Use the determinant of three points to determine whether it is collinear
    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = p3
    return (y2 - y1) * (x3 - x2) == (y3 - y2) * (x2 - x1)

def generate_triangle_inequality_graph(num_nodes: int, max_weight: int, filename: str) -> list[list[int, int, float]]:
    nodes = []
    
    # Generate points randomly, make sure they're not collinear
    while len(nodes) < num_nodes:
        x, y = random.uniform(0, max_weight), random.uniform(0, max_weight)
        valid = True
        for i in range(len(nodes)):
            for j in range(i):
                if is_collinear(nodes[i], nodes[j], (x, y)):
                    valid = False
                    break
            if not valid:
                break
        if valid:
            nodes.append((x, y))
    
    # Construct a list of edges and calculate Euclidean distances
    edges = []
    for i in range(num_nodes):
        for j in range(i):
            weight = math.sqrt((nodes[i][0] - nodes[j][0])**2 + (nodes[i][1] - nodes[j][1])**2)
            edges.append((i, j, round(weight, 2)))
            
    generate_file(num_nodes, len(edges), edges, filename)
    
    return edges


def generate_random_graph(num_nodes:int, max_weight:int, filename: str) -> list[list[int, int, float]]:
    """
    Generate a random graph
    """
    # initialize
    edges = []
    for i in range(num_nodes):
        for j in range(i):  # Traverse the triangle to avoid repetition
            weight = random.randint(1, max_weight)  # random generate weight
            edges.append((i, j, weight))
            
    generate_file(num_nodes, len(edges), edges, filename)
     
    return edges

def generate_test_file(vertex_count: int, maxWeight: int, obey_triangle_inequality: bool, dir_name: str):
    if obey_triangle_inequality:
        generate_triangle_inequality_graph(vertex_count, maxWeight, f"{dir_name}/test_{vertex_count}_triangle_inequality.txt")
    else:
        generate_random_graph(vertex_count, maxWeight, f"{dir_name}/test_{vertex_count}_random.txt")
        
def validate_triangle_inequality(edges: list[tuple[int, int, float]], num_nodes: int) -> bool:
    """
    Based on the shortest path, verify that the graph satisfies the triangle inequality.
    :param edges: A list of edges of the graph, where each edge is (u, v, weight)
    :param num_nodes: vertices
    :return: True if the triangle inequality is satisfied, False otherwise
    """
    INF = float('inf')
    
    # Construct the adjacency matrix
    adj_matrix = [[INF] * num_nodes for _ in range(num_nodes)]
    for u, v, weight in edges:
        adj_matrix[u][v] = weight
        adj_matrix[v][u] = weight  # symmetric
    
    # Verifying the triangle inequality
    for i in range(num_nodes):
        for j in range(num_nodes):
            for k in range(num_nodes):
                # Exclude its own path
                if i != j and j != k and i != k:
                    if adj_matrix[i][j] + adj_matrix[j][k] + 1 < adj_matrix[i][k]:
                        print(f"Triangle inequality violated: d({i}, {j}, {adj_matrix[i][j]}) + d({j}, {k}, {adj_matrix[j][k]}) < d({i}, {k}, {adj_matrix[i][k]})")
                        return False
    
    print("All triangle inequalities satisfied.")
    return True