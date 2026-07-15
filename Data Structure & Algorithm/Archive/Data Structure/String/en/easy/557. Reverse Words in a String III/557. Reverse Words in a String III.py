# 557. Reverse Words in a String III

# Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

# Example 1:
# Input: s = "Let's take LeetCode contest"
# Output: "s'teL ekat edoCteeL tsetnoc"

# Example 2:
# Input: s = "God Ding"
# Output: "doG gniD"


class Solution:

    def reverseWords(self, s: str) -> str:
        arr = s.split()
        for i in range(len(arr)):
            arr[i] = arr[i][::-1]
        return ' '.join(arr)


# test
string = "Let's take LeetCode contest"
solution = Solution()
res = solution.reverseWords(string)
print(res)