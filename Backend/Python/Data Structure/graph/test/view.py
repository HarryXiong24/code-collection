"""
File: view.py
"""

from model import GraphDemoModel
from algorithms import shortest_paths, span_tree, topo_sort

class GraphDemoView(object):
    """视图类"""

    def __init__(self):
        self._model = GraphDemoModel()

    def run(self):
        """运行"""
        menu = "\nMain menu\n" + \
                "1 Input a graph from the keyboard\n" + \
                "2 Input a graph from a file\n" + \
                "3 View the current graph\n" + \
                "4 Single-source shortest paths\n" + \
                "5 Minimum spanning tree\n" + \
                "6 Topological sort\n" + \
                "7 Exit the program\n"
        while True:
            command = self._get_command(7, menu)
            if command == 1:
                self._get_from_keyboard()
            elif command == 2:
                self._get_from_file()
            elif command == 3:
                print(self._model.get_graph())
            elif command == 4:
                print("Paths:\n", self._model.run(shortest_paths))
            elif command == 5:
                print("".join(map(str, self._model.run(span_tree))))
            elif command == 6:
                print("Sort:",
                        " ".join(map(str, self._model.run(topo_sort))))
            else:
                break

    def _get_command(self, high, menu):
        """获取命令"""
        prompt = "Enter a number [1-" + str(high) + "]: "
        command_range = list(map(str, range(1, high + 1)))
        error = "Error, number must be 1 to " + str(high)
        while True:
            print(menu)
            command = input(prompt)
            if command in command_range:
                return int(command)
            else:
                print(error)

    def _get_from_keyboard(self):
        """从键盘创建图"""
        rep = ""
        print("Format: a->b:1")
        while True:
            edge = input("Enter an edge or return to quit: ")
            if edge == "":
                break
            rep += edge + " "
        start_label = input("Enter the start label: ")
        print(self._model.create_graph(rep, start_label))

    def _get_from_file(self):
        """从文件创建图"""
        file = input("Enter the file name: ")
        f = open("./" + file, "r")
        rep = ""
        for line in f.readlines():
            rep += line
        line.replace("\n", " ")
        start_label = input("Enter the start label: ")
        print(self._model.create_graph(rep, start_label))


def main():
    GraphDemoView().run()


if __name__ == '__main__':
    main()