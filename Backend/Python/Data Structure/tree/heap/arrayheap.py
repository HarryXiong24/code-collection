"""
File: arrayheap.py
"""


from abstractcollection import AbstractCollection

class ArrayHeap(AbstractCollection):

    def __init__(self, source_collection=None):
        self._heap = list()
        AbstractCollection.__init__(self, source_collection)

    def peek(self):
        if self.isEmpty():
            raise Exception("Heap is empty")
        return self._heap[0]

    def add(self, item):
        self._size += 1
        self._heap.append(item)
        cur_pos = len(self._heap) - 1
        while cur_pos > 0:
            # 父节点索引
            parent = (cur_pos - 1) // 2
            parent_item = self._heap[parent]
            if parent_item <= item:
                break
            else: # 父节点 > item, 则item 与父节点互换
                self._heap[cur_pos] = self._heap[parent]
                self._heap[parent] = item
                cur_pos = parent

    def pop(self):
        if self.isEmpty():
            raise Exception("Heap is empty.")
        self._size -= 1
        top_item = self._heap[0]
        bottom_item = self._heap.pop(len(self._heap) - 1)
        if len(self._heap) == 0:
            return bottom_item

        self._heap[0] = bottom_item
        last_index = len(self._heap) - 1
        cur_pos = 0
        while True:
            left_child = 2 * cur_pos + 1
            right_child = 2 * cur_pos + 2
            if left_child > last_index:
                break
            if right_child > last_index:
                max_child = left_child
            else:
                left_item = self._heap[left_child]
                right_item = self._heap[right_child]
                if left_item < right_item:
                    max_child = left_child
                else:
                    max_child = right_child
            max_item = self._heap[max_child]
            if bottom_item <= max_item:
                break
            else:
                self._heap[cur_pos] = self._heap[max_child]
                self._heap[max_child] = bottom_item
                cur_pos = max_child
        return top_item


    def __iter__(self):
        tempList = list(self._heap)
        resultList = []
        while not self.isEmpty():
            resultList.append(self.pop())
        self._heap = tempList
        self._size = len(self._heap)
        return iter(resultList)
      
    def __str__(self):
        def strHelper(position, level):
            result = ""
            if position < len(self):
                result += strHelper(2 * position + 2, level + 1)
                result += "|" * level
                result += str(self._heap[position]) + "\n"
                result += strHelper(2 * position + 1, level + 1)
            return result
        return strHelper(0, 0)

def main():
    heap = ArrayHeap()
    print("Adding D B A C F E G")
    heap.add("D")
    heap.add("B")
    heap.add("A")
    heap.add("C")
    heap.add("F")
    heap.add("E")
    heap.add("G")

    print("\nPeek:", heap.peek())

    print("\nString:\n" + str(heap))

    print("\nfor loop: ")
    for item in heap:
        print(item, end=" ")

    print("\n\nRemovals: ")
    while not heap.isEmpty(): print(heap.pop(), end=" ")

    heap = ArrayHeap(range(1, 8))
    print("\n\nHeap with 1..7:")
    print(heap)
    print("\nfor loop: ")
    for item in heap:
        print(item, end=" ")

if __name__ == "__main__":
    main()