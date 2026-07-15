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


def generate_random_graph(num_nodes:int, max_weight:int, filename: str) -> list[list[int, int, int]]:
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
