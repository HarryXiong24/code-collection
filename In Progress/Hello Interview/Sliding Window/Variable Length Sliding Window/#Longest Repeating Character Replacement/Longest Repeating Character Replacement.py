# DESCRIPTION (inspired by Leetcode.com)
# Write a function to find the length of the longest substring containing the same letter in a given string s, after performing at most k operations in which you can choose any character of the string and change it to any other uppercase English letter.

# Input:
# s = "BBABCCDD"
# k = 2
# Output:
# 5
# Explanation: Replace the first 'A' and 'C' with 'B' to form "BBBBBCDD". The longest substring with identical letters is "BBBBB", which has a length of 5.

# Time Complexity: O(n)
# Space Complexity: O(1), since the map never contains more than 26 keys.
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # Your code goes here
        max_count = 0
        char_dict = {}
        max_frequent = 0
        left = 0
        right = 0

        while right < len(s):
            if s[right] not in char_dict:
                char_dict[s[right]] = 0
            char_dict[s[right]] += 1

            # get max_frequent
            max_frequent = max(max_frequent, char_dict[s[right]])

            if max_frequent + k < right - left + 1:
                # max_frequent is a historical high-water mark, not the true max frequency of the current window. After a shrink it can be too large. That staleness is harmless because of one invariant: max_frequent is stale (too big) → the condition is falsely False → no shrink → window grows by one while still invalid. That looks like a bug, but the window can only grow past a size that was genuinely achievable... no. It grows into an invalid state, and max_count records it. The reason this is still safe: an invalid window of size L can only be reached if some earlier window of size L was valid, since max_frequent was legitimately that high at some point and the size only got there by that same growth path.
                char_dict[s[left]] -= 1
                left += 1

            max_count = max(max_count, right - left + 1)
            right += 1

        return max_count


# test
res = Solution().characterReplacement("BBABCCDD", 2)
print(res)
