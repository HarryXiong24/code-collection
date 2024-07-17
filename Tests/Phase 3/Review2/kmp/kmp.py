from typing import List


def KMPSearch(text: str, pattern: str) -> int:
    if len(pattern) == 0:
        return 0

    def findLSP(pattern: str) -> List[int]:
        lsp = [0] * len(pattern)
        j = 0
        lsp[0] = 0

        for i in range(1, len(pattern)):
            while j > 0 and pattern[i] != pattern[j]:
                j = lsp[j - 1]
            if pattern[i] == pattern[j]:
                j += 1
            lsp[i] = j
        return lsp

    lsp = findLSP(pattern)
    j = 0

    for i in range(0, len(text)):
        while j > 0 and text[i] != pattern[j]:
            j = lsp[j - 1]
        if text[i] == pattern[j]:
            if j == len(pattern) - 1:
                return i - j
            j += 1

    return -1


# test
res = KMPSearch("AABABABABC", "ABABC")
print(res)
