"""
File: graph.py
"""

from abstractcollection import AbstractCollection

class LinkedEdge(object):
    """边--源顶点、目标顶点、权重、标记状态"""

    def __init__(self, from_vertex, to_vertex, weight=None):
        self._vertex1 = from_vertex
        self._vertex2 = to_vertex
        self._weight = weight
        self._mark = False

    def clear_mark(self):
        self._mark = False

    def __eq__(self, other):
        """比较"""
        if self is other:
            return True
        if type(self) != type(other):
            return False
        return self._vertex1 == other._vertex1 and \
                self._vertex1 == other._vertex2 and \
                self._weight == other._weight

    def get_other_vertex(self, this_vertex):
        """返回该边两端的顶点"""
        if this_vertex == None or this_vertex == self._vertex2:
            return self._vertex1
        else:
            return self._vertex2

    def get_to_vertex(self):
        """返回目标顶点"""
        return self._vertex2

    def get_weight(self):
        return self._weight

    def set_mark(self):
        self._mark = True

    def set_weight(self, weight):
        self._weight = weight

    def __str__(self):
        return str(self._vertex1) + "->" + \
                str(self._vertex2) + ":" + \
                str(self._weight)


class LinkedVertex(object):
    """顶点--标签、边的列表、标记状态"""

    def __init__(self, label):
        self._label = label # 顶点名称
        self._edge_list = list()
        self._mark = False

    def clear_mark(self):
        self._mark = False

    def is_marked(self):
        return self._mark

    def set_mark(self):
        self._mark = True

    def set_label(self, label, g):
        """修改顶点的标签"""
        # 弹出该顶点，重新设置label并加入字典
        g._vertices.pop(self._label, None)
        g._vertices[label] = self
        self._label = label

    def get_label(self):
        return self._label

    def __str__(self):
        return str(self._label)

    def __eq__(self, other):
        if self is other:
            return True
        if type(self) != type(other):
            return False
        return self.get_label() == other.get_label()

    def add_edge_to(self, to_vertex, weight):
        """给顶点添加一个目标顶点"""
        edge = LinkedEdge(self, to_vertex, weight)
        self._edge_list.append(edge)

    def get_edge_to(self, to_vertex):
        """返回该顶点与目标顶点的边"""
        for edge in self._edge_list:
            if edge._vertex1 == self and edge._vertex2 == to_vertex:
                return edge
        else:
            return None

    def incident_edges(self):
        """返回该顶点的所有边"""
        return iter(self._edge_list)

    def neighboring_vertices(self):
        """返回与顶点连通的其他顶点"""
        vertices = list()
        for edge in self._edge_list:
            # 根据边的两个顶点，给定一个顶点返回另一个顶点
            vertices.append(edge.get_other_vertex(self))
        return iter(vertices)

    def remove_edge_to(self, to_vertex):
        """删除指定顶点的边"""
        removed_edge = LinkedEdge(self, to_vertex)
        for edge in self._edge_list:
            # 源顶点与目标顶点是否相同
            if removed_edge._vertex1 == edge._vertex1 and \
                removed_edge._vertex2 == edge._vertex2:
                self._edge_list.remove(edge)
                return True
        return False


class LinkedDirectedGraph(AbstractCollection):
    """链表结构有向图-边的数量、顶点集合的字典"""

    def __init__(self, source_collection=None):
        self._edge_count = 0
        self._vertices = dict()
        AbstractCollection.__init__(self, source_collection)

    def clear(self):
        """清空图"""
        self._size = 0
        self._edge_count = 0
        self._vertices = dict()

    def clear_edge_marks(self):
        """清空所有边的标记状态"""
        for edge in self.edges():
            edge.clear_mark()

    def clear_vertex_marks(self):
        """清空所有顶点的标记状态"""
        for vertex in self.vertices():
            vertex.clear_mark()

    def size_edges(self):
        return self._edge_count

    def size_vertices(self):
        return len(self)

    def __str__(self):
        result = str(self.size_vertices()) + " Vertices: "
        for vertex in self._vertices:
            result += " " + str(vertex)
        result += "\n"
        result += str(self.size_edges()) + " Edges: "
        for edge in self.edges():
            result += " " + str(edge)
        return result

    def add(self, label):
        """添加顶点"""
        self.add_vertex(label)

    def add_vertex(self, label):
        self._vertices[label] = LinkedVertex(label)
        self._size += 1

    def contain_vertex(self, label):
        return label in self._vertices

    def get_vertex(self, label):
        return self._vertices[label]

    def remove_vertex(self, label):
        """成功移除返回True"""
        removed_vertex = self._vertices.pop(label)
        if removed_vertex is None:
            return False

        # 删除其他顶点指向该顶点的边
        for vertex in self.vertices():
            if vertex.remove_edge_to(removed_vertex):
                self._edge_count -= 1

        # 删除该顶点指向其他顶点的边
        for edge in removed_vertex.incident_edges():
            self._edge_count -= 1

        # 顶点数量减一
        self._size -= 1
        return True

    def add_edge(self, from_label, to_label, weight):
        """添加一条带有权重的有向边"""
        from_vertex = self.get_vertex(from_label)
        to_vertex = self.get_vertex(to_label)
        from_vertex.add_edge_to(to_vertex, weight)
        self._edge_count += 1

    def contain_edge(self, from_label, to_label):
        """是否包含某条边"""
        return self.get_edge(from_label, to_label) != None

    def get_edge(self, from_label, to_label):
        """获取一条边"""
        from_vertex = self.get_vertex(from_label)
        to_vertex = self.get_vertex(to_label)
        return from_vertex.get_edge_to(to_vertex)

    def remove_edge(self, from_label, to_label):
        from_vertex = self.get_vertex(from_label)
        to_vertex = self.get_vertex(to_label)
        edge_removed_flg = from_vertex.remove_edge_to(to_vertex)
        if edge_removed_flg:
            self._edge_count -= 1
        return edge_removed_flg

    def __iter__(self):
        return self.vertices()

    def edges(self):
        """返回所有边的集合"""
        result = list()
        for vertex in self.vertices():
            result += list(vertex.incident_edges())
        return iter(result)

    def vertices(self):
        """返回所有的节点对象"""
        return iter(self._vertices.values())

    def incident_edges(self, label):
        """返回节点的边"""
        return self.get_vertex(label).incident_edges()

    def neighboring_vertices(self, label):
        """返回顶点所有连通的顶点"""
        return self.get_vertex(label).neighboring_vertices()
