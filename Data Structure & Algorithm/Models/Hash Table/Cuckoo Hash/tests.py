import random as rand
from cuckoo_hash import CuckooHash


def cuckoo_hash_tests():
    print("starting test 1")

    input_size, table_size = 10, 10
    nums = [i for i in range(input_size)]

    c = CuckooHash(table_size)
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

    ref_ans = [
        [None, None, 7, None, 6, None, None, 8, None, 9],
        [None, None, None, None, 5, None, None, None, None, None],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 1 table contents incorrect")
        return

    print("\ntest 1 table contents correct")

    print("\n\nstarting test 2")

    input_size, table_size = 20, 10
    nums = [i for i in range(input_size)]

    c = CuckooHash(table_size)
    for num in nums:
        # there should be a cycle when inserting 15
        print("inserting %d" % num)
        no_cycle = c.insert(num)
        if no_cycle == False:
            print("found cycle when inserting %d" % num)
            break

    ref_ans = [
        [2, None, 14, None, 12, 13, 10, 5, None, 9],
        [None, 8, 0, 15, 7, 11, 3, 4, None, 1],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 2 table contents incorrect")
        return

    c.rehash(20)
    ref_ans = [
        [
            None,
            None,
            12,
            None,
            4,
            None,
            None,
            13,
            None,
            14,
            None,
            None,
            1,
            None,
            None,
            11,
            None,
            3,
            0,
            9,
        ],
        [
            None,
            None,
            8,
            5,
            None,
            15,
            None,
            None,
            None,
            None,
            None,
            10,
            None,
            None,
            None,
            None,
            None,
            None,
            2,
            7,
        ],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 2 table contents incorrect")
        return

    print("\ntest 2 table contents correct")


if __name__ == "__main__":
    cuckoo_hash_tests()
