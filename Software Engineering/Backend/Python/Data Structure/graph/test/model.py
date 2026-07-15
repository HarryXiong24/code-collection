"""
File: model.py
"""


from graph import LinkedDirectedGraph

class GraphDemoModel(object):
    """模型类"""

    def __init__(self):
        self._graph = None
        self._start_label = None

    def create_graph(self, rep, start_label):
        """创建图"""
        self._graph = LinkedDirectedGraph()
        self._start_label = start_label
        edge_list = rep.split()
        for edge in edge_list:
            if not '->' in edge:
                # 单个顶点(edge == label)
                if not self._graph.contain_vertex(edge):
                    self._graph.add_vertex(edge)
                else:
                    self._graph = None
                    return "Duplicate vertex"
            else:
                # 两个顶点和一条边
                bracket_pos = edge.find("->")
                col_on_pos = edge.find(":")
                if bracket_pos == -1 or col_on_pos == -1 or \
                    bracket_pos > col_on_pos:
                    self._graph = None
                    return "Problem with -> or :"
                from_label = edge[:bracket_pos]
                to_label = edge[bracket_pos + 2:col_on_pos]
                weight = edge[col_on_pos + 1:]
                if weight.isdigit():
                    weight = int(weight)
                if not self._graph.contain_vertex(from_label):
                    self._graph.add_vertex(from_label)
                if not self._graph.contain_vertex(to_label):
                    self._graph.add_vertex(to_label)
                if self._graph.contain_edge(from_label, to_label):
                    self._graph = None
                    return "Duplicate edge"
                self._graph.add_edge(from_label, to_label, weight)
        # 起始顶点
        vertex = self._graph.get_vertex(start_label)
        if vertex == None:
            self._graph = None
            return "Start label not in graph"
        else:
            vertex.set_mark()
            return "Graph created successfully"

    def get_graph(self):
        """返回图"""
        if self._graph == None:
            return None
        else:
            return str(self._graph)

    def run(self, algorithm):
        """根据参数，运行指定的算法"""
        if self._graph == None:
            return None
        else:
            return algorithm(self._graph, self._start_label)
