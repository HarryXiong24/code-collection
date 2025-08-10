# explanations for member functions are provided in requirements.py
# each file that uses a cuckoo hash should import it from this file.
import copy
import random as rand
from typing import List, Optional

class CuckooHash24:
	def __init__(self, init_size: int):
		self.__num_rehashes = 0
		self.bucket_size = 4
		self.CYCLE_THRESHOLD = 10
		self.table_size = init_size
		self.tables = [[None]*init_size for _ in range(2)]

	def get_rand_idx_from_bucket(self, bucket_idx: int, table_id: int) -> int:
		# you must use this function when you need to displace a random key from a bucket during insertion (see the description in requirements.py). 
		# this function randomly chooses an index from a given bucket for a given table. this ensures that the random 
		# index chosen by your code and our test script match.
		# 
		# for example, if you are inserting some key x into table 0, and hash_func(x, 0) returns 5, and the bucket in index 5 of table 0 already has 4 elements,
		# you will call get_rand_bucket_index(5, 0) to determine which key from that bucket to displace, i.e. if get_random_bucket_index(5, 0) returns 2, you
		# will displace the key at index 2 in that bucket.
		rand.seed(int(str(bucket_idx) + str(table_id)))
		return rand.randint(0, self.bucket_size-1)

	def hash_func(self, key: int, table_id: int) -> int:
		key = int(str(key) + str(self.__num_rehashes) + str(table_id))
		rand.seed(key)
		return rand.randint(0, self.table_size-1)

	def get_table_contents(self) -> List[List[Optional[List[int]]]]:
		# the buckets should be implemented as lists. Table cells with no elements should still have None entries.
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
			bucket = self.tables[current_table][hash_value]
			if bucket is None:
				self.tables[current_table][hash_value] = [current_key]
				return True
			elif len(bucket) < self.bucket_size:
				self.tables[current_table][hash_value].append(current_key)
				return True
			else:
				rand_idx = self.get_rand_idx_from_bucket(hash_value, current_table)
				temp = bucket[rand_idx]
				bucket[rand_idx] = current_key
				current_key = temp
				current_table = 1 - current_table 
				collision_count += 1
		return False

	def lookup(self, key: int) -> bool:
		# TODO
		hash_value1 = self.hash_func(key, 0)
		hash_value2 = self.hash_func(key, 1)
		if (self.tables[0][hash_value1] is not None and key in self.tables[0][hash_value1]) or (self.tables[1][hash_value2] is not None and key in self.tables[1][hash_value2]):
			return True
		return False
		
	def delete(self, key: int) -> None:
		# TODO
		hash_table = [0, 1]
		for index in hash_table:
			hash_value = self.hash_func(key, index)
			if (self.tables[index][hash_value] is not None and key in self.tables[index][hash_value]):
				self.tables[index][hash_value].remove(key)
				if len(self.tables[index][hash_value]) == 0:
					self.tables[index][hash_value] = None

	def rehash(self, new_table_size: int) -> None:
		self.__num_rehashes += 1; self.table_size = new_table_size # do not modify this line
		# TODO
		old_items = []
		for i in range(len(self.tables)):
			for j in range(len(self.tables[i])):
				if self.tables[i][j] is not None:
					old_items.append(self.tables[i][j])

		self.tables = [[None]*new_table_size for _ in range(2)]
		for item in old_items:
				if item is not None:
					for k in item:
						self.insert(k)

	# feel free to define new methods in addition to the above
	# fill in the definitions of each required member function (above),
	# and for any additional member functions you define


