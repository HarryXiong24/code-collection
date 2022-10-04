# 557 反转字符串中的单词 III

# 给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

# 示例 1：
# 输入：s = "Let's take LeetCode contest"
# 输出："s'teL ekat edoCteeL tsetnoc"

# 示例 2:
# 输入： s = "God Ding"
# 输出："doG gniD"


# 双指针交换，也可以用 reverse 方法
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