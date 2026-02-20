import random as rand
from cuckoo_hash_single_table import CuckooHash24SingleTable


def cuckoo_hash_tests():
    print("starting test 1")

    input_size, table_size = 10, 10
    nums = [i for i in range(input_size)]

    c = CuckooHash24SingleTable(table_size)
    for num in nums:
        print("inserting %d" % num)
        no_cycle = c.insert(num)
        if no_cycle == False:
            print("error: cycle should not exist")

    for num in nums[:5]:
        print("deleting %d" % num)
        c.delete(num)
        if c.lookup(num):
            print("error: %d should not exist in cuckoo hash" % num)

    ref_ans = [None, None, [7], None, [6], None, None, [5, 8], None, [9]]

    if not c.get_table_contents() == ref_ans:
        print("test 1 table contents incorrect")
        return
    print("\ntest 1 table contents correct")

    print("\n\nstarting test 2")

    input_size, table_size = 40, 10
    nums = [i for i in range(input_size)]

    c = CuckooHash24SingleTable(table_size)
    for num in nums:
        # there should be a cycle when inserting 34
        print("inserting %d" % num)
        no_cycle = c.insert(num)
        if no_cycle == False:
            print("found cycle when inserting %d" % num)
            break

    ref_ans = [
        [2, 11, 16, 19],
        [24, 29],
        [30, 7, 14, 25],
        [27, 33],
        [4, 6, 12, 15],
        [13, 18, 21, 22],
        [0, 10, 17, 31],
        [5, 8, 34, 23],
        [26, 28],
        [3, 9, 1, 32],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 2 table contents incorrect")
        return

    c.rehash(20)
    ref_ans = [
        [29, 28],
        [19],
        [12, 18],
        [24, 21, 22],
        [4],
        None,
        [1, 32],
        [13],
        [34],
        [16, 14, 23],
        None,
        [33],
        [2, 7, 15, 17],
        None,
        [6],
        [11, 31, 26],
        [25, 27],
        [30, 5, 3],
        [0, 8],
        [10, 9],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 2 table contents incorrect")
        return
    print("\ntest 2 table contents correct")


if __name__ == "__main__":
    cuckoo_hash_tests()
