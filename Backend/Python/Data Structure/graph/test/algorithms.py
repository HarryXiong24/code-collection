"""
File: algorithms.py
"""

from linkedstack import LinkedStack
import copy
import sys


def topo_sort(g, start_label=None):
    stack = LinkedStack()
    g.clear_vertex_marks()
    for v in g.vertices():
        if not v.is_marked():
            dfs(g, v, stack)
    return stack

def dfs(g, v, stack):
    """深度优先搜索算法"""
    v.set_mark()
    for w in g.neighboring_vertices(v.get_label()):
        if not w.is_marked():
            dfs(g, w, stack)
    stack.push(v)


def span_tree(g, start_label):
    """最小生成树"""
    # sys.setrecursionlimit(1500)  # set the maximum depth as 1500
    min_weights = 99999
    results = []

    def recurse(w, stack):
        if w.is_marked() == False:
            # 顶点未标记则入栈
            stack.push(w)
            w.set_mark()
            # 未遍历完的情况
            if stack.get_size() != g.size_vertices():
                for x in w.neighboring_vertices():
                    # 继续从顶点的连通节点往下继续遍历
                    recurse(x, stack)
                    # 如果从w的连通节点再往下没有连通节点，
                    # 则出栈w已入栈的连通节点
                    if stack.peek() != w and \
                            stack.get_size() < g.size_vertices():
                        temp = stack.pop()
                        temp.clear_mark()
            else:
                # 已经遍历完所有顶点，并且满足了条件，
                # 但最后一个节点还有连通的顶点时，不再遍历
                # if w.get_edge_count() > 0:
                #     return None
                pass
        else:
            return None

    def generate_results(sun_stack):
        temp = ""
        for v_temp in sun_stack:
            temp += v_temp.get_label() + "->"
        temp = temp[:len(temp) - 2]
        temp += ": " + str(sun_stack.get_weights())
        temp += "\n"
        results.append(temp)

    for v in g.vertices():
        # stack存储整个顶点, sun_stack复制stack的最新状态并继续遍历
        stack = LinkedStack()
        stack.push(v)
        sun_stack = copy.deepcopy(stack)
        for w in v.neighboring_vertices():
            # 清除所有顶点的标记状态(因为上一次的遍历顶点已经被标记)
            g.clear_vertex_marks()
            v.set_mark()
            # 递归遍历
            recurse(w, sun_stack)
            # 如果遍历结束,栈内顶点数==图的顶点数代表该次遍历成功，加入成功列表
            if sun_stack.get_size() == g.size_vertices():
                if sun_stack.get_weights() < min_weights:
                    results.clear()
                    generate_results(sun_stack)
                    min_weights = sun_stack.get_weights()
                elif sun_stack.get_weights() == min_weights:
                    generate_results(sun_stack)
            else:
                # 未找到路径则继续下一个连接顶点的遍历
                pass
            sun_stack = copy.deepcopy(stack)

    if results == None:
        return "No best path"
    string = "Here are " + str(len(results)) + " path:\n"
    results.insert(0, string)
    return results





def shortest_paths(g, start_label):
    """dijkstra"""
    pass
