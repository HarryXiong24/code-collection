# explanations for member functions are provided in requirements.py
# each file that uses a cuckoo hash should import it from this file.
import random as rand
from typing import List, Optional


class CuckooHash24SingleTable:
    def __init__(self, init_size: int):
        self.__num_rehashes = 0
        self.bucket_size = 4
        self.CYCLE_THRESHOLD = 10

        self.table_size = init_size
        self.table = [None] * self.table_size

    def get_rand_bucket_index(self, bucket_idx: int) -> int:
        # you must use this function when you need to evict a random key from a bucket. this function
        # randomly chooses an index from a given cell index. this ensures that the random
        # index chosen by your code and our test script match.
        #
        # for example, if you need to remove a random element from the bucket at table index 5,
        # you will call get_rand_bucket_index(5) to determine which key from that bucket to evict, i.e. if get_random_bucket_index(5) returns 2, you
        # will evict the key at index 2 in that bucket.
        rand.seed(int(str(bucket_idx)))
        return rand.randint(0, self.bucket_size - 1)

    def hash_func(self, key: int, func_id: int) -> int:
        # access h0 via func_id=0, access h1 via func_id=1
        key = int(str(key) + str(self.__num_rehashes) + str(func_id))
        rand.seed(key)
        result = rand.randint(0, self.table_size - 1)
        return result

    def get_table_contents(self) -> List[Optional[List[int]]]:
        # the buckets should be implemented as lists. Table cells with no elements should still have None entries.
        return self.table

    # you should *NOT* change any of the existing code above this line
    # you may however define additional instance variables inside the __init__ method.
    def insert(self, key: int) -> bool:
        # TODO
        collision_count = 0
        current_key = key
        current_func = 0

        for i in range(2):
            hash_value = self.hash_func(current_key, i)
            bucket = self.table[hash_value]
            if bucket is None:
                self.table[hash_value] = [current_key]
                return True
            elif len(bucket) < self.bucket_size:
                self.table[hash_value].append(current_key)
                return True

        while collision_count <= self.CYCLE_THRESHOLD:
            hash_value = self.hash_func(current_key, current_func)
            bucket = self.table[hash_value]
            if bucket is None:
                self.table[hash_value] = [current_key]
                return True
            elif len(bucket) < self.bucket_size:
                self.table[hash_value].append(current_key)
                return True
            else:
                rand_idx = self.get_rand_bucket_index(hash_value)
                temp = bucket[rand_idx]
                bucket[rand_idx] = current_key
                current_key = temp
                current_func = 1 - current_func
                collision_count += 1
        return False

    def lookup(self, key: int) -> bool:
        # TODO
        hash_value1 = self.hash_func(key, 0)
        hash_value2 = self.hash_func(key, 1)
        if (self.table[hash_value1] is not None and key in self.table[hash_value1]) or (
            self.table[hash_value2] is not None and key in self.table[hash_value2]
        ):
            return True
        return False

    def delete(self, key: int) -> None:
        # TODO
        hash_func = [0, 1]
        for index in hash_func:
            hash_value = self.hash_func(key, index)
            if self.table[hash_value] is not None and key in self.table[hash_value]:
                self.table[hash_value].remove(key)
                if len(self.table[hash_value]) == 0:
                    self.table[hash_value] = None

    def rehash(self, new_table_size: int) -> None:
        self.__num_rehashes += 1
        self.table_size = new_table_size  # do not modify this line
        # TODO
        old_table = self.table
        self.table = [None] * new_table_size
        for bucket in old_table:
            if bucket is not None:
                for key in bucket:
                    self.insert(key)

    # feel free to define new methods in addition to the above
    # fill in the definitions of each required member function (above),
    # and for any additional member functions you define
