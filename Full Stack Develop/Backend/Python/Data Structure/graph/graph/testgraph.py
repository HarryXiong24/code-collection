from graph import *

g = LinkedDirectedGraph()

g.add_vertex("A")
g.add_vertex("B")
g.add_vertex("C")
g.add_vertex("D")
g.add_vertex("E")

g.add_edge("A", "B", 3)
g.add_edge("A", "C", 2)
g.add_edge("B", "D", 1)
g.add_edge("C", "D", 1)
g.add_edge("D", "E", 2)

print(g)