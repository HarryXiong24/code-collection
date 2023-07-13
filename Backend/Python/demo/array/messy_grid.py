"""
杂乱网格
"""

from arrays import Array

class MessyGrid(object):
    def __init__(self, rows, columns, fill_value=None):
        self._data = Array(rows)
        for row in range(rows):
            self._data[row] = Array(columns[row], fill_value)

    def get_height(self):
        return len(self._data)

    def get_width(self):
        all_width = []
        for i in range(self.get_height()):
            all_width.append(len(self._data[i]))
        return all_width


    def all_width(self):
        max_width = 1
        min_width = 1
        for i in range(self.get_height()):
            width = len(self._data[i])
            if width > max_width:
                max_width = width
            if width < min_width:
                max_width = width
        result = ""
        result += "Min Width: {}".format(min_width) + "\n"
        result += "Max Width: {}".format(max_width) + "\n"
        result += "All Width: {}".format(self.get_width())
        return result

    def __getitem__(self, index):
        return self._data[index]

    def __str__(self):
        result = ""
        for row in range(self.get_height()):
            for col in range(self.get_width()[row]):
                result += str(self._data[row][col]) +" "
            result += "\n"
        return result
