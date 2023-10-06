from typing import Dict


def countFrequency(s: str) -> dict:
    count_map: Dict[str, int] = dict({})

    for i in range(0, len(s)):
        if s[i] in count_map:
            count_map[s[i]] = count_map[s[i]] + 1
        else:
            count_map[s[i]] = 1

    for key, value in count_map.items():
        print(f"Count of char: {key} is equal to = {value}")

    return count_map


if __name__ == "__main__":
    inputString = input()
    res = countFrequency(inputString)
    print(res)

# test
# res = countFrequency('')
# res2 = countFrequency("sdhjs\\\\nd323;';;[;[p;]]")
# print(res)
# print(res2)
