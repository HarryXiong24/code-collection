# 给你一个字符串 s , 逐个翻转字符串中的所有单词
# 单词是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开
# 请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。
# 说明：
# 1.输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
# 2.翻转后单词间应当仅用一个空格分隔。
# 3.翻转后的字符串中不应包含额外的空格

# 示例 1：
# 输入：s = "the sky is blue"
# 输出："blue is sky the"

# 示例 2：
# 输入：s = "  hello world  "
# 输出："world hello"
# 解释：反转后的字符串中不能存在前导空格和尾随空格。

# 示例 3：
# 输入：s = "a good   example"
# 输出："example good a"
# 解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。


class Solution:

    def reverseWords(self, s: str) -> str:
        arr = s.split()
        length = len(arr)
        slow = 0
        fast = length - 1
        while slow < fast:
            temp = arr[slow]
            arr[slow] = arr[fast]
            arr[fast] = temp
            slow = slow + 1
            fast = fast - 1

        return ' '.join(arr)


# test
str = 'a good   example'
solution = Solution()
res = solution.reverseWords(str)
print(res)