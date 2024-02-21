import random as rand
from typing import List, Optional


class CuckooHash:
    def __init__(self, init_size: int):
        self.__num_rehashes = 0
        self.CYCLE_THRESHOLD = 10

        self.table_size = init_size
        self.tables = [[None] * init_size for _ in range(2)]

    def hash_func(self, key: int, table_id: int) -> int:
        key = int(str(key) + str(self.__num_rehashes) + str(table_id))
        rand.seed(key)
        return rand.randint(0, self.table_size - 1)

    def get_table_contents(self) -> List[List[Optional[int]]]:
        return self.tables

    # you should *NOT* change any of the existing code above this line
    # you may however define additional instance variables inside the __init__ method.

    def insert(self, key: int) -> bool:
        # TODO
        collision_count = 0
        current_key = key
        current_table = 0
        while collision_count <= self.CYCLE_THRESHOLD:
            hash_value = self.hash_func(current_key, current_table)
            if self.tables[current_table][hash_value] == None:
                self.tables[current_table][hash_value] = current_key
                return True
            else:
                temp = self.tables[current_table][hash_value]
                self.tables[current_table][hash_value] = current_key
                current_key = temp
                current_table = 1 - current_table
                collision_count += 1
        return False

    def lookup(self, key: int) -> bool:
        # lookup(key): return True if an item with the specified key exists in the cuckoo hash, and False otherwise.
        # TODO
        hash_value1 = self.hash_func(key, 0)
        hash_value2 = self.hash_func(key, 1)
        if self.tables[0][hash_value1] == key or self.tables[1][hash_value2] == key:
            return True
        return False

    def delete(self, key: int) -> None:
        # delete(key): delete item with the specified key from the cuckoo hash and replace it with a None entry.
        # TODO
        hash_table = [0, 1]
        for index in hash_table:
            hash_value = self.hash_func(key, index)
            if self.tables[index][hash_value] == key:
                self.tables[index][hash_value] = None

    def rehash(self, new_table_size: int) -> None:
        # rehash(new_table_size): update self.tables such that both tables are of size new_table_size, and all existing elements
        self.__num_rehashes += 1
        self.table_size = new_table_size  # do not modify this line
        # TODO
        old_items = []
        for i in range(len(self.tables)):
            for j in range(len(self.tables[i])):
                if self.tables[i][j] is not None:
                    old_items.append(self.tables[i][j])

        self.tables = [[None] * new_table_size for _ in range(2)]
        for item in old_items:
            self.insert(item)

    # feel free to define new methods in addition to the above
    # fill in the definitions of each required member function (above),
    # and for any additional member functions you define
