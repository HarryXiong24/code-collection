from typing import List


def KMPSearch(text: str, pattern: str) -> int:
    def findLSP(pattern: str) -> List[int]:
        lsp = [0] * len(pattern)
        length = 0
        i = 1

        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length = length + 1
                lsp[i] = length
                i = i + 1
            else:
                if length != 0:
                    length = lsp[length-1]
                else:
                    lsp[i] = 0
                    i = i + 1

        return lsp

    i = 0
    j = 0
    lsp = findLSP(pattern)

    while i < len(text):
        if text[i] == pattern[j]:
            i = i + 1
            j = j + 1
        elif j > 0:
            j = lsp[j-1]
        else:
            i = i + 1

        if j == len(pattern):
            return i - j
    return -1


# test
text = "AABABABABC"
pattern = "ABABC"
res = KMPSearch(text, pattern)
print(res)
