# DESCRIPTION (inspired by Leetcode.com)
# Write a function to return the length of the longest substring in a provided string s where all characters in the substring are distinct.

# Example 1:
# Input:
# s = "eghghhgg"
# Output:
# 3
# The longest substring without repeating characters is "egh" with length of 3.

# Example 2:
# Input:
# s = "substring"
# Output:
# 8
# The answer is "ubstring" with length of 8.

# Time Complexity: O(n), start and end pointer will each iterate through the string once.
# Space Complexity: O(n), where n is the length of the string.
class Solution:
    def longestSubstringWithoutRepeat(self, s: str) -> int:
        # Your code goes here
        char_map = {}
        max_count = 0
        left = 0
        right = 0

        while right < len(s):
            if s[right] not in char_map:
                char_map[s[right]] = 0
            char_map[s[right]] += 1

            while char_map[s[right]] > 1:
                char_map[s[left]] -= 1
                left += 1

            max_count = max(max_count, right - left + 1)
            right += 1

        return max_count


# test
res = Solution().longestSubstringWithoutRepeat("eghghhgg")
print(res)
