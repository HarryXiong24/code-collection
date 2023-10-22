# 345. 反转字符串中的元音字母

# 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串
# 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现


# 双指针
class Solution:

    def reverseVowels(self, s: str) -> str:
        mySet = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'}
        arr = list(s)
        left = 0
        right = len(arr) - 1
        while left < right:
            if arr[left] not in mySet:
                left = left + 1
            if arr[right] not in mySet:
                right = right - 1
            if arr[left] in mySet and arr[right] in mySet:
                temp = arr[left]
                arr[left] = arr[right]
                arr[right] = temp
                left = left + 1
                right = right - 1
        return ''.join(arr)


# test
string = 'hello'
solution = Solution()
res = solution.reverseVowels(string)
print(res)