import random as rand
from cuckoo_hash_24 import CuckooHash24


def cuckoo_hash_tests():
    print("starting test 1")

    input_size, table_size = 10, 10
    nums = [i for i in range(input_size)]

    c = CuckooHash24(table_size)
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
        [None, None, [7], None, [6], None, None, [5, 8], None, [9]],
        [None, None, None, None, None, None, None, None, None, None],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 1 table contents incorrect")
        return
    print("\ntest 1 table contents correct")

    print("\n\nstarting test 2")

    input_size, table_size = 20, 10
    nums = [i for i in range(input_size * 4)]

    c = CuckooHash24(table_size)
    for num in nums:
        # there should be a cycle when inserting 71
        print("inserting %d" % num)
        no_cycle = c.insert(num)
        if no_cycle == False:
            print("found cycle when inserting %d" % num)
            break

    ref_ans = [
        [
            [2, 11, 16, 44],
            [68, 39, 47, 53],
            [1, 7, 14, 30],
            [27, 36, 62, 55],
            [4, 6, 12, 49],
            [13, 18, 22, 69],
            [0, 10, 40, 35],
            [59, 8, 20, 23],
            [26, 28, 63, 43],
            [3, 54, 32, 41],
        ],
        [
            [24],
            [37, 29, 67, 70],
            [25, 46, 45, 64],
            [15, 33, 56, 38],
            [5, 52, 48, 66],
            [21, 58, 60],
            [31, 34, 9, 61],
            [17, 42],
            [19, 51],
            [50, 57, 65],
        ],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 2 table contents incorrect")
        return

    c.rehash(20)

    ref_ans = [
        [
            [39, 47, 37, 38],
            [19],
            [68, 12, 49, 18],
            [62, 22, 21, 24],
            [4, 40, 20, 56],
            [44, 42],
            [36, 54, 32],
            [13],
            [48, 58, 34, 51],
            [16, 50, 55, 23],
            [45, 66, 60],
            [59, 33, 52],
            [2, 17, 1, 7],
            [61, 65],
            [6, 57],
            [11, 35, 26, 31],
            [27, 25],
            [30, 3, 5],
            [69, 0, 8],
            [10, 64, 9],
        ],
        [
            [28],
            None,
            None,
            [14],
            None,
            [15],
            None,
            [46],
            None,
            None,
            None,
            [43, 70],
            None,
            [63],
            None,
            [29, 67],
            None,
            None,
            [41],
            [53],
        ],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 2 table contents incorrect")
        return
    print("\ntest 2 table contents correct")

    print("\n\nstarting test 3")

    input_size, table_size = 20, 20
    nums = [i for i in range(input_size * 4)]

    c = CuckooHash24(table_size)
    for num in nums:
        # there should be a cycle when inserting 71
        print("inserting %d" % num)
        no_cycle = c.insert(num)
        if no_cycle == False:
            print("found cycle when inserting %d" % num)
            break

    ref_ans = [
        [
            [11, 16, 25, 44],
            [2, 19, 76],
            [24, 39, 47],
            [53, 67, 68],
            [1, 30, 78],
            [7, 14, 60, 74],
            [55, 58, 64, 75],
            [79, 36, 50, 62],
            [6, 49, 65],
            [4, 72, 15, 21],
            [22, 38, 70],
            [13, 18, 69],
            [0, 35, 57, 71],
            [10, 17, 40, 77],
            [5, 20, 48, 59],
            [8, 23, 56, 33],
            [26, 43, 45, 63],
            [28, 42, 51],
            [32],
            [73, 9, 41, 52],
        ],
        [
            None,
            None,
            None,
            [37, 29],
            None,
            [46],
            [12, 54],
            None,
            [66],
            None,
            None,
            None,
            [3, 34],
            [31, 61],
            None,
            [27],
            None,
            None,
            None,
            None,
        ],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 3 table contents incorrect")
        return

    c.rehash(20)

    ref_ans = [
        [
            [39, 47, 38, 29],
            [19, 78],
            [68, 49, 18, 12],
            [24, 62, 63, 22],
            [4, 40, 20, 56],
            [44, 71, 42, 73],
            [75, 36, 32, 54],
            [13],
            [58, 48, 51, 34],
            [16, 43, 14, 55],
            [76, 60, 45, 66],
            [59, 33, 52],
            [2, 46, 1, 7],
            [74, 65, 61],
            [6, 57],
            [11, 35, 26, 31],
            [25, 27],
            [30, 79, 5, 3],
            [72, 69, 0, 8],
            [64, 10, 9],
        ],
        [
            [28, 37],
            None,
            None,
            None,
            [23],
            [15],
            [50],
            None,
            None,
            None,
            None,
            [21, 70, 77],
            None,
            None,
            None,
            [67, 17],
            None,
            None,
            [41],
            [53],
        ],
    ]

    if not c.get_table_contents() == ref_ans:
        print("test 3 table contents incorrect")
        return

    print("\ntest 3 table contents correct")


if __name__ == "__main__":
    cuckoo_hash_tests()
