# 数学计算



## 1. Fizz Buzz(E)

### 题目

写一个程序，输出从 1 到 *n* 数字的字符串表示。

1. 如果 *n* 是3的倍数，输出“Fizz”；

2. 如果 *n* 是5的倍数，输出“Buzz”；

3. 如果 *n* 同时是3和5的倍数，输出 “FizzBuzz”。

**示例：**

```
n = 15,

返回:
[
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz"
]
```



### 思路

* 一个循环，里面加判断
* 注意顺序，先判断同时被3，5整除的



### 解答

```typescript
// MySolution
function fizzBuzz(n: number): string[] {
  let res: string[] = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      res.push('FizzBuzz')
      continue
    }
    if (i % 3 === 0) {
      res.push('Fizz')
      continue
    }
    if (i % 5 === 0) {
      res.push('Buzz')
      continue
    }
    res.push(`${i}`)
  }

  return res;
};

// Test
let number = 15;
let res = fizzBuzz(number);
console.log(res);
```



```typescript
// 优解，避免更多的讨论和if语句的顺序
// MySolution
function fizzBuzz(n: number): string[] {
  let res: string[] = [];
    for (let i = 1; i <= n; i++) {
      // 避免了更多的讨论
      let str = '';
      if (i % 3 === 0) {
        str += 'Fizz';
      }
      if (i % 5 === 0) {
        str += 'Buzz';
      }
      res.push(str || `${i}`);
    }
    return res;
  };

// Test
let number = 15;
let res = fizzBuzz(number);
console.log(res);
```



## 2. 计数质数(H)

### 题目

统计所有小于非负整数 *n* 的质数的数量。

**示例:**

```
输入: 10
输出: 4
解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
```



### 思路

* 常规做法



### 解答

```typescript
// My Solution
// 这种做法最终通过不了，数特别大的时候运行超时
function countPrimes(n: number): number {
  let res: number[] = [];

  for (let i = 2; i <= n-1; i++) {
    let flag = 0;
    let num = 2;
    while (num <= i) {
      if (i % num !== 0) {
        flag = 1;
        num++;
      }
      if (i % num === 0 && i !== num) {
        flag = 0;
        break;
      }
      if (i % num === 0 && i === num) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      res.push(i)
    }
  }
  console.log(res)
  return res.length;
};

// Test
let number = 499979;
let res = countPrimes(number);
console.log(res);
```



**埃拉托斯特尼筛法**

本算法的核心思想是：给出要筛选数值的范围$n$，找出$\sqrt{n}$ 以内的素数 $p_{1}, p_{2}, \dots, p_{k}$

先用 2 去筛，即把 2 留下，把 2 的倍数剔除掉；再用下一个素数，也就是 3 筛，把 3 留下，把 3 的倍数剔除掉；接下去用下一个素数 5 筛，把 5 留下，把 5 的倍数剔除掉；不断重复下去……

如下图所示：

![埃拉托斯特尼筛法](https://pic.leetcode-cn.com/e8474aa61d67182243271bc929634fdded6bf3a9d8247648e40d9588d94e4c98-file_1573653807043)

```typescript
// 埃拉托斯特尼筛法
function countPrimes(n: number): number {
  let count = 0;
  // 优化，只开辟n+1个空间
  let signs: any[] = new Array(n+1);

  // 注意：刚好等于2的时候不进入循环
  for (let i = 2; i < n; i++) {
    if (!signs[i - 1]) {
      count++;
      // 通过筛选的过程，直接省略了素数的正常判断步骤
      for (let j = i * i; j <= n; j += i) {
          signs[j - 1] = true;
      }
    }
  }

  return count;
};

// Test
let number = 3;
let res = countPrimes(number);
console.log(res);
```



## 3. 3的幂(E)

### 题目

给定一个整数，写一个函数来判断它是否是 3 的幂次方。

**示例 1:**

```
输入: 27
输出: true
```

**示例 2:**

```
输入: 0
输出: false
```

**示例 3:**

```
输入: 9
输出: true
```

**示例 4:**

```
输入: 45
输出: false
```

**进阶：**
你能不使用循环或者递归来完成本题吗？



### 思路

* 直接法即可
* 注意特殊情况，比如3的0次方



### 解答

```typescript
// My Solution
function isPowerOfThree(n: number): boolean {
  // 特殊情况，3的0次方
  if (n === 1) {
    return true
  }

  let i = 3;
  while (i <= n ) {
    if (i === n) {
      return true
    }
    i = i * 3;
  }

  return false
};

// Test
let number = 28;
let res = isPowerOfThree(number);
console.log(res);
```



```typescript
function isPowerOfThree(n: number): boolean {
    // 特殊情况，3的0次方
    if(n === 0) {
        return false;
    }
    // 如果是3的幂次方，可以一直整除3，直到剩1。
    // 这种思路是上面解法的逆思路
    while(n%3 === 0) {
        n/=3;
    }
    // 特殊情况，3的0次方
    if(n === 1) {
        return true;
    }
    return false;
};
```



## 4. 罗马数字转整数(H)

###  题目

罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 2 写做 `II` ，即为两个并列的 1。12 写做 `XII` ，即为 `X` + `II` 。 27 写做 `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

**示例 1:**

```
输入: "III"
输出: 3
```

**示例 2:**

```
输入: "IV"
输出: 4
```

**示例 3:**

```
输入: "IX"
输出: 9
```

**示例 4:**

```
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```

**示例 5:**

```
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```



### 解答

```java
class Solution {
    public int romanToInt(String s) {
        int len = s.length();
        int total = 0;
        char c1;

        for (int i = 0; i < len; i++) {
            c1 = s.charAt(i);
            switch (c1) {
                case 'I':
                    total += 1;
                    break;
                case 'V':
                    total += 5;
                    break;
                case 'X':
                    total += 10;
                    break;                      //"MCDLXXVI"
                case 'L':
                    total += 50;
                    break;
                case 'C':
                    total += 100;
                    break;
                case 'D':
                    total += 500;
                    break;
                case 'M':
                    total += 1000;
                    break;
            }
        }
        for (int j = 0; j < len - 1; j++) {
            char c2 = s.charAt(j);
            char c3 = s.charAt(j + 1);
            switch (c2) {
                case 'I':
                    if (c3 == 'V' || c3 == 'X')
                        total -= 2;
                    break;
                case 'X':
                    if (c3 == 'L' || c3 == 'C')
                        total -= 20;
                    break;
                case 'C':
                    if (c3 == 'D' || c3 == 'M')
                        total -= 200;
                    break;
            }
        }
        return total;
    }
}
```

