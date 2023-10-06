from typing import List


def add(s1: str, s2: str) -> str:
    res: List[int] = []
    s1_array = list(s1[::-1])
    s2_array = list(s2[::-1])

    maxStr: List[str] = ''
    if len(s1_array) < len(s2_array):
        maxStr = s2_array
    else:
        maxStr = s1_array

    digital = 0
    i = 0
    while i < len(s1_array) and i < len(s2_array):
        total = int(s1_array[i]) + int(s2_array[i]) + digital
        digital = total // 10
        current = total % 10
        res.append(current)
        i = i + 1

    while i < len(maxStr):
        total = int(maxStr[i]) + digital
        digital = total // 10
        current = total % 10
        res.append(current)
        i = i + 1

    if digital > 0:
        res.append(digital)

    return ''.join(map(str, res[::-1]))


# test
res = add("9876543210", "1234567890")
print(res)
