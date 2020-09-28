# 字符串



## 1. 最长公共前缀(H)

### 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1:**

```
输入: ["flower","flow","flight"]
输出: "fl"
```

**示例 2:**

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

**说明:**

所有输入只包含小写字母 `a-z` 。



### 解法

* 先假设最长子串是数组里第一个字符串
* 建立循环，数组里每个字符串进行比对
* 如果当前字符串与maxStr匹配不成功，maxStr从末位进行缩短，maxStr缩短到0时，没有匹配字符串，则返回""
* 边界条件：注意一开始就是空的状态



### 解答

```typescript
// 较好理解的方法
function longestCommonPrefix(strs: string[]): string {

  // 如果数组里长度为空，说明没有字符串，直接返回""
  if (strs.length === 0) {
    return "";
  }

  // 定义最长字符串，默认是数组里第一个字符串的所有值
  let maxStr: string = strs[0];

  // 建立循环，数组里每个字符串进行比对
  for (let i: number = 0; i < strs.length; i++) {
    // 如果当前字符串与maxStr匹配不成功
    while (strs[i].indexOf(maxStr) !== 0) {
      // maxStr从末位进行缩短
      maxStr = maxStr.substring(0, maxStr.length - 1);
      // maxStr缩短到0时，没有匹配字符串，则返回""
      if (maxStr.length === 0) {
        return "";
      }
    }
  }

  return maxStr;
};

// Test
let res: string = longestCommonPrefix(["flower","flow","flight"])
console.log(res)
```



## 2. 最长回文子串(H)

### 题目

给定一个字符串 `s`，找到 `s` 中最长的回文子串。你可以假设 `s` 的最大长度为 1000。

**示例 1：**

```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```

**示例 2：**

```
输入: "cbbd"
输出: "bb"
```

  

### 解法

**中心扩展法**

* 每一个位置的字母都有可能是回文串的中心轴， 有三种可能：单轴/双轴左部/双轴右部
* 例如：
* aba 此时的 b 就是作为单轴
* cbbc 此时的 bb 就是作为双轴, 对每一个 b 细分， 就是第一个 b 就是双轴左部，第二个 b 就是双轴右部了
* 综合考虑一下, 发现双轴左/右只需要考虑到一个就可以
* 所以这里只考虑了作为单轴和作为双轴右部 



### 解答

```java
class Solution {
    public String longestPalindrome(String s) {
        // 考虑边界条件
        if (s == null || s.length() < 1) {
            return "";
        }
        
        // 定义当前最长子串的起始结束值
        int start = 0, end = 0;
        
        // 建立循环，把数组中每一个元素当成中心位进行比对
        for (int i = 0; i < s.length(); i++) {
            // 单中心位的情况
            int len1 = expandAroundCenter(s, i, i);
            // 双中心位的情况
            int len2 = expandAroundCenter(s, i, i + 1);
            // 比较觉得取哪种情况
            int len = Math.max(len1, len2);
            // 将最新比对结果同步到start，end中
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
	
    // 中心扩展方法
    private int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        // 当满足left = right的时候，左右位个移一步
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        // 为什么返回R - L - 1，因为只有当左右不匹配的时候，才会退出循环。但是匹配成功，不管下一位是否匹配成功，都会移动一步
        // 所以返回R - L - 1即是匹配到了最长子串的长度
        return R - L - 1;
    }
}


// 时间复杂度：O(n^2)，其中 n 是字符串的长度。长度为 1 和 2 的回文中心分别有 n和 n-1个，每个回文中心最多会向外扩展 O(n)次。

// 空间复杂度：O(1))。
```



```typescript
// Typescript版本
function longestPalindrome(s: string): string {
  // 考虑边界条件
  if (s === null || s.length < 1) {
    return "";
  }

  let start: number = 0;
  let end: number = 0;
  
  for (let i: number = 0; i < s.length; i++) {
    let len1: number = expandAroundCenter(s, i, i);
    let len2: number = expandAroundCenter(s, i, i+1);
    let len: number = Math.max(len1, len2);
	
    // 特别注意这里，js不同于java，这里需要使用Math.floor进行向下取整，不然会有小数，影响结果
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end+1);
};


function expandAroundCenter(s: string, left: number, right: number): number {
  let L: number = left;
  let R: number = right;

  while (L >= 0 && R < s.length && (s.charAt(L) === s.charAt(R))) {
    L--;
    R++;
  }

  return R - L - 1;
}


// Test
let res: string = longestPalindrome("cbbd")
console.log(res)
```



## 3. 翻转字符串里的单词(N)

### 题目

给定一个字符串，逐个翻转字符串中的每个单词。

 

**示例 1：**

```
输入: "the sky is blue"
输出: "blue is sky the"
```

**示例 2：**

```
输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
```

**示例 3：**

```
输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
```

 

**说明：**

- 无空格字符构成一个单词。
- 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
- 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。



### 思路

* 拆分
* 用正则表达式把多个空格变成一个
* 去一头一尾空格



### 解法

```typescript
// My Solution
function reverseWords(s: string): string {
  let arr: string[] = s.split(" ");
  arr.reverse()

  return arr.join(" ").replace(/\s+/g, ' ').trim();
};


// Test
let res: string = reverseWords("a good   example")
console.log(res)
```



```typescript
// 一句话写法(思路一样)
function reverseWords(s: string): string {
    return s.trim().split(/\s+/).reverse().join(' ')
};
```



## 4.反转字符串中的单词 III(N)

### 题目

给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

**示例 1:**

```
输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
```

**注意**：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。



### 思路

* 拆分每个单词
* 单词在拆分，然后反序，之后又合并
* 最后join连接



### 解法

```typescript
// My Solution
function reverseWords(s: string): string {
  let word: string[] = s.split(" ");
  let reverseWord: string[] = [];
  word.forEach( (value: string) => {
    value = value.split("").reverse().join("")
    reverseWord.push(value);
  }) 

  return reverseWord.join(" ");
};

// Test
let res: string = reverseWords("a good example")
console.log(res)
```



```typescript
// 一句话写法
// 思路有点区别
// 先全部拆开，变成一个个字母，然后全部反序，之后连接，之后按单词又拆开并且反序，最后按单词连接
function reverseWords(s: string): string {
  return s.split("").reverse().join("").split(" ").reverse().join(" ");
};
```



## 5. 整数反转(N)

### 题目

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

**示例 1:**

```
输入: 123
输出: 321
```

 **示例 2:**

```
输入: -123
输出: -321
```

**示例 3:**

```
输入: 120
输出: 21
```

**注意:**

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。



### 解法

* 变成字符串反序，再变回Number
* 之后判断是否溢出



### 解答

```typescript
// 优解
function reverse(x: number): number {
  // 0-9不用反序
  if (x >= 0 && x < 9) {
    return x;
  }
  
  // 变成字符串处理
  let str: string = Math.abs(x).toString().split("").reverse().join("");
  // 变回number
  let res: number = Number(str);
	
  判断范围
  if (+res > 2 ** 31 - 1) {
    return 0;
  }
  if (x > 0) {
    return +res;
  } else {
    return -res;
  }
}

// Test
let num = -12345;
let res = reverse(num);
console.log(res);
```



## 6. 字符串中的第一个唯一字符(H)

### 题目

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

 

**示例：**

```
s = "leetcode"
返回 0

s = "loveleetcode"
返回 2
```

 

**提示：**你可以假定该字符串只包含小写字母。



### 解法

* 对字符串的字母进行频率统计，找到出现频率为1 的字母索引。

* 借助哈希映射两次遍历完成。第一次遍历进行字母频率统计，Hash Map 的Key 为字母，Value 为出现频率。第二次遍历找到频率为 1 的字母索引返回即可。



### 解答

```typescript
// 频率统计法
function firstUniqChar(s: string): number {
  let map = new Map()

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) {
      map.set(s[i], 1)
    }
    else if (map.has(s[i])) {
      map.set(s[i], (map.get(s[i]) + 1))
    }
  }

  for (let i = 0; i < s.length; i++) {
    if(map.get(s[i]) === 1) {
      return i; // 找到词频为1的字母(只出现一次)返回其索引
    }
  }

  return -1;
};

// Test
let s = "aadadaade";
let res = firstUniqChar(s);
console.log(res);
```



```typescript
// 巧妙利用indexOf和lastIndexOf
// 又快又方便
function firstUniqChar(s: string): number {
  let set = 'abcdefjhijklmnopqrstuvwxyz';
  let res = s.length;
  for (let i = 0; i < set.length; i++) {
    let firstIndex = s.indexOf(set[i]);
    if (firstIndex == -1) {
      continue;
    };
    let lastIndex = s.lastIndexOf(set[i]);
    // 两次索引值相同则证明该字母只出现一次
    if (firstIndex == lastIndex) {
      // res 为只出现一次的字母中索引值最小的
      res = Math.min(firstIndex, res);
    }
  }
  return res == s.length ? -1 : res;
};

// Test
let s = "aadadaade";
let res = firstUniqChar(s);
console.log(res);
```



## 7. 有效的字母异位词(H)

### 题目

给定两个字符串 *s* 和 *t* ，编写一个函数来判断 *t* 是否是 *s* 的字母异位词。

**示例 1:**

```
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2:**

```
输入: s = "rat", t = "car"
输出: false
```

**说明:**
你可以假设字符串只包含小写字母。

**进阶:**
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？



### 思路

* 建立两个map
* 分别统计字母出现的次数
* 之后对比次数是否一致
* 注意长度，长度不相等的直接返回false



### 解答

```typescript
// My Solution
function isAnagram(s: string, t: string): boolean {

  if (s.length !== t.length) {
    return false;
  }

  let map1 = new Map()
  let map2 = new Map()

  for (let i = 0; i < s.length; i++) {
    if (!map1.has(s[i])) {
      map1.set(s[i], 1)
    }

    else if (map1.has(s[i])) {
      map1.set(s[i], map1.get(s[i]) + 1)
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (!map2.has(t[i])) {
      map2.set(t[i], 1)
    }

    else if (map2.has(t[i])) {
      map2.set(t[i], map2.get(t[i]) + 1)
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (map1.get(s[i]) !== map2.get(s[i])) {
      return false
    }
  }

  return true;
};

// Test
let s = "anfgram";
let t = "nagaram";
let res = isAnagram(s, t);
console.log(res);
```



```typescript
// 另一种思路
// 把字符串排序重组，然后比较
function isAnagram(s: string, t: string): boolean {
  s = s.split("").sort().join("");
  t = t.split("").sort().join("");
  return s == t;
}
```



##  8. 验证回文字符串(H)

### 题目

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明：**本题中，我们将空字符串定义为有效的回文串。

**示例 1:**

```
输入: "A man, a plan, a canal: Panama"
输出: true
```

**示例 2:**

```
输入: "race a car"
输出: false
```



### 解法

* 本题的难点在于去掉符号
* 其实对于JS,TS就是使用正则表达式
* 至于比较回文，就是使用前后指针



### 解答

```typescript
// 优解
function isPalindrome(s: string): boolean {
  s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
  let l = 0, r = s.length - 1
  while (l < r) {
    if (s[l] !== s[r]) {
      return false
    }
    l++
    r--
  }
  return true
};

// Test
let s = "A man, a plan, a canal: Panama";
let res = isPalindrome(s);
console.log(res);
```



## 9. 外观数列(H)

### 题目

给定一个正整数 *n*（1 ≤ *n* ≤ 30），输出外观数列的第 *n* 项。

注意：整数序列中的每一项将表示为一个字符串。

「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。前五项如下：

```
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

第一项是数字 1

描述前一项，这个数是 `1` 即 “一个 1 ”，记作 `11`

描述前一项，这个数是 `11` 即 “两个 1 ” ，记作 `21`

描述前一项，这个数是 `21` 即 “一个 2 一个 1 ” ，记作 `1211`

描述前一项，这个数是 `1211` 即 “一个 1 一个 2 两个 1 ” ，记作 `111221`

 

**示例 1:**

```
输入: 1
输出: "1"
解释：这是一个基本样例。
```

**示例 2:**

```
输入: 4
输出: "1211"
解释：当 n = 3 时，序列是 "21"，其中我们有 "2" 和 "1" 两组，"2" 可以读作 "12"，也就是出现频次 = 1 而 值 = 2；类似 "1" 可以读作 "11"。所以答
```



### 解答

```typescript
// 优解
function countAndSay(n: number): string {
  // 只有1个的情况
  if (n === 1) {
    return '1'
  }

  // 定义初始为1
  let ans = "1";
  // 从2开始循环
  for (let i = 2; i <= n; i++) {
    let temp = '';
    let cur = '';
    let cnt = 0;
    // 遍历ans
    for (let char of ans) {
      if (char !== cur) {
        if (cnt > 0) {
          temp += `${cnt}${cur}`
        }
        cur = char;
        cnt = 1;
      } else {
        cnt++;
      }
    }
    temp += `${cnt}${cur}`;
    ans = temp;
  }
  return ans;
};
```



## 10. 字符串转换整数 (atoi)(H)

### 题目

请你来实现一个 `atoi` 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

- 如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
- 假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
- 该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0 。

**提示：**

- 本题中的空白字符只包括空格字符 `' '` 。
- 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231, 231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

 

**示例 1:**

```
输入: "42"
输出: 42
```

**示例 2:**

```
输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
```

**示例 3:**

```
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
```

**示例 4:**

```
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
```

**示例 5:**

```
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。
```



### 思路 

* 排除开头不是数字或+，-的情况
* 使用正则截取`符号+数字`或`数字`的部分

* 注意特殊情况，比如`"+-2"`,`+`,`-`这样的情况



### 解答

```typescript
// MySolution
function myAtoi(str: string): number {
  str = str.trim()

  // 排除开头不是数字或+，-的情况
  if (str.search(/^\-|\+|[0-9]/) !== 0) {
    return 0;
  } else {
    // 正则匹配，特别注意有两种情况
    let res = str.match(/^((\-|\+)([0-9]+))|^([0-9]+)/)

    if (res === null) {
      return 0;
    }

    let newStr = res[0]
    let number = Number(newStr)
	
    // 判断是否溢出
    if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
      return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    } else {
      return number;
    }
  
  }
};

// Test
let s = "+-2";
let res = myAtoi(s);
console.log(res);
```



```typescript
// 偷懒的解法
/**
 * parseInt(string, radix)的转换规则
 * string：要被解析的值。如果参数不是一个字符串，则将其转换为字符串。字符串开头的空白符将会被忽略。
 * radix（可选）：需要转换的进制，介于 2 到 36。
 * 返回值： 如果被解析参数的第一个字符无法被转化成数值类型，则返回NaN。
 * 
 * 对比下题意，发现:
 * 无视开头空格（满足）
 * 返回有符号整数（满足）
 * 无视整数部分后的字符（满足）
 * 范围在32位内（含）（不满足）
 * 其他情况返回0（不满足）
 * 那么只要有针对性的处理下不满足的条件即可。
 */
function myAtoi(str: string): number {
  const number = parseInt(str, 10);

  if(isNaN(number)) {
      return 0;
  } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
      return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
  } else {
      return number;
  }
};

// Test
let s = "+-2";
let res = myAtoi(s);
console.log(res);
```



## 11. 判断子序列(N)

### 题目

给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

示例 1:

```
s = "abc", t = "ahbgdc"

返回 true.
```

示例 2:

```
s = "axc", t = "ahbgdc"

返回 false.
```



### 解答

* 此题采用双指针



### 解答

```typescript
function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s.charAt(i) === t.charAt(j)) {
      i++
    }
    j++
  }

  return i === s.length
};
```



```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        int i = 0, j = 0;
        while (i < n && j < m) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == n;
    }
}
```



## 12. 有效的括号(H)

### 题目

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

**示例 1:**

```
输入: "()"
输出: true
```

**示例 2:**

```
输入: "()[]{}"
输出: true
```

**示例 3:**

```
输入: "(]"
输出: false
```

**示例 4:**

```
输入: "([)]"
输出: false
```

**示例 5:**

```
输入: "{[]}"
输出: true
```



### 解法

* 遍历字符串
* 匹配到左括号时是将其相应的右括号进行了压栈
* 遇到右括时判断和栈顶元素是否相等即可
* 最后判断栈是否为空



### 解答

```typescript
执行用时为 60 ms 的范例
let map: any = {
    '{' : '}',
    '(' : ')',
    '[' : ']'
}

function isValid(s: string): boolean {
	// 开辟一个栈
    let stack: string[] = [];
    // 设置栈顶
    let top: string | undefined;
	
    // 遍历字符串的每个元素
    for(let char of s){
        let value;
        // 有前半部分就压栈，后半部分出现就出栈
        if((value = map[char])){
            stack.push(value);
        } else {
            top = stack.pop();
            if(top !== char){
                return false;
            }
        }
    }
	
    // 栈元素为空则说明匹配完毕
    return !stack.length;
}
```

