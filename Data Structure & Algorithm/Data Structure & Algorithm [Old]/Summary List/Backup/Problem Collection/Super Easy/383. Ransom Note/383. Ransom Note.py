# 383. Ransom Note

# Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

# Each letter in magazine can only be used once in ransomNote.

# Example 1:
# Input: ransomNote = "a", magazine = "b"
# Output: false

# Example 2:
# Input: ransomNote = "aa", magazine = "ab"
# Output: false

# Example 3:
# Input: ransomNote = "aa", magazine = "aab"
# Output: true


class Solution:

    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        map = {}

        for item in magazine:
            if item in map:
                map[item] += 1
            else:
                map[item] = 1

        for item in ransomNote:
            if item in map and map[item] > 0:
                map[item] -= 1
            else:
                return False

        return True


# test
solution = Solution()
res = solution.canConstruct('aa', 'aab')
print(res)