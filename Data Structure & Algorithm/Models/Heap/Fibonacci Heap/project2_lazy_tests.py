import requirements
import random as rand

# Instructions
# Some test cases for the FibHeap class can be found below.
#
# Note that the test cases here are just to give an idea of how we will test your submissions, so passing these tests does not mean that your code is correct.
# It is a good idea to try and create different test cases with different table sizes to fully test your implementation.


def is_delete_min_correct(roots):
    seen = set()
    for root in roots:
        if len(root.children) in seen:
            return False
        seen.add(len(root.children))
    return True


def fib_heap_tests():
    fib = requirements.FibHeapLazy()
    # uncomment the following line to test FibHeapLazy. The outputs should stay the same.
    # fib = requirements.FibHeapLazy()
    fib.insert(5)
    fib.insert(7)
    fib.insert(12)
    node = fib.insert(14)
    fib.insert(2)

    if [x.val for x in fib.get_roots()] != [5, 7, 12, 14, 2]:
        print("fib heap contents incorrect")
        return

    if fib.find_min_lazy().val != 2:
        print("min value incorrect")
        return

    fib.delete_min_lazy()
    if not is_delete_min_correct(fib.get_roots()):
        print("delete_min incorrect")
        for item in fib.get_roots():
            print(item.val, len(item.children))
        return

    if fib.find_min_lazy().val == 2:
        print("error: min val should have changed")
        return

    fib.decrease_priority(node, 1)
    if fib.find_min_lazy().val != 1:
        print("min val should be 1")
        return

    print("all tests passed")


if __name__ == "__main__":
    fib_heap_tests()
