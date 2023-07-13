"""
网格
"""

from arrays import Array

class Grid(object):
    def __init__(self, rows, columns, fill_value=None):
        self._data = Array(rows)
        for row in range(rows):
            self._data[row] = Array(columns, fill_value)

    def get_height(self):
        return len(self._data)

    def get_width(self):
        return len(self._data[0])

    def __getitem__(self, index):
        return self._data[index]

    def __str__(self):
        result = ""
        for row in range(self.get_height()):
            for col in range(self.get_width()):
                result += str(self._data[row][col]) +" "
            result += "\n"
        return result
