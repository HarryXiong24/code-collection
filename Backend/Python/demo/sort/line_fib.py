def fib(n):
    if n < 3:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)


def line_fib(n):
    """线性斐波那锲"""
    sum = 1
    first = 1
    second = 1
    count = 3
    while count <= n:
        sum = first + second
        first = second
        second = sum
        count += 1
    return second

def main():
    print(fib(3))
    print(line_fib(3))


if __name__ == '__main__':
    main()