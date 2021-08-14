# 一维数组



## 1. 寻找数组的中心索引(N)

### 题目

给定一个整数类型的数组 `nums`，请编写一个能够返回数组 **“中心索引”** 的方法。

我们是这样定义数组 **中心索引** 的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

 

**示例 1：**

```
输入：
nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
索引 3 (nums[3] = 6) 的左侧数之和 (1 + 7 + 3 = 11)，与右侧数之和 (5 + 6 = 11) 相等。
同时, 3 也是第一个符合要求的中心索引。
```

**示例 2：**

```
输入：
nums = [1, 2, 3]
输出：-1
解释：
数组中不存在满足此条件的中心索引。
```

 

**说明：**

- `nums` 的长度范围为 `[0, 10000]`。
- 任何一个 `nums[i]` 将会是一个范围在 `[-1000, 1000]`的整数。



### 思路

* 寻找中心索引，可以发现规律：``left*2 + mid = sum` 根据此规律可以巧妙化解
* 注意边界问题，比如`[-1,-1,-1,0,1,1]`时，中心索引为0



### 解答

```typescript
// My solution
function pivotIndex(nums: number[]): number {
  let i: number = 0;
  let sum: number = 0;
  let left: number = 0;

  for( i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  for( i = 0; i < nums.length; i++) {
    if (sum - left - nums[i] === left) {
      return i;
    }
    left += nums[i];
  }

  return -1;
};

// Test
let res: number = pivotIndex([-1,-1,-1,0,1,1]);
console.log(res);
```



```typescript
// Better effect
// 分析：比较来看，思路都是一样，可能是forEach求和的效率比for循环更高
function pivotIndex(numbers: number[]): number {
   let index = -1;
    let sumLeft = 0;
    let total = getTotal(numbers);
    for(let i = 0;  i < numbers.length; i ++ ) {
        if (sumLeft * 2 + numbers[i] == total) {
            return i;
        }
        sumLeft += numbers[i];
    }
    return index;
};

function getTotal(arr: number[]) {
    let total = 0;
    arr.forEach((item) => {
        total += item;
    });
    return total;
}
let nums = [1, 2, 3]
pivotIndex(nums);
```



## 2. 搜索插入位置(N)

#### 题目

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

**示例 1:**

```
输入: [1,3,5,6], 5
输出: 2
```

**示例 2:**

```
输入: [1,3,5,6], 2
输出: 1
```

**示例 3:**

```
输入: [1,3,5,6], 7
输出: 4
```

**示例 4:**

```
输入: [1,3,5,6], 0
输出: 0
```



### 思路

* 简单的数组一一比较
* 边界，最左边和最右边要考虑到
* 遇到循环里的if判断可能会超出数组长度的情况下，优先考虑在数组头部解决这一问题，而不是在尾部解决



### 解法

```typescript
// My Solution
function searchInsert(nums: number[], target: number): number {
  let i: number = 0;

  // 在最左边的情况
  if (target <= nums[0]) {
    return 0;
  }

  // 一般情况
  for (i = 1; i < nums.length; i++) {
    if (target === nums[i]) {
      return i;
    }

    if (target > nums[i-1] && target < nums[i]) {
      return i;
    }
  }

  // 在最右边的情况
  return nums.length;
};

// Test
let res: number = searchInsert([1], 1)
console.log(res)
```



```typescript
// Better effect
// 分析：我用的是顺序查找，优解用折半查找。今后一定要注意，遇到顺序数组的时候，优先想到折半查找！
function searchInsert(nums: number[], target: number): number {
    let left: number = 0;
    let right: number = nums.length - 1;

    while (left <= right) {
        let mid: number = Math.floor((left + right) / 2);

        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
};
```



## 3. 合并区间(H)

### 题目

合并区间

给出一个区间的集合，请合并所有重叠的区间。

**示例 1:**

```
输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2:**

```
输入: [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```



### 解法

* 先按`intervals[i][0]` 进行排序

* 循环判断` intervals >= intervals[i+1][0]`

* 符合条件删除`` intervals[i+1]``

  

**注**：

* 边界`i < intervals.length-1`
* 因为删除元素，数组变短了。此时： `i--`



### 解答

```typescript
// 比较好理解的方法
function merge(intervals: number[][]): number[][] {
  
  // 先按照区间起始位置排序
  // 这一步功能是按每个子数组首元素大小，对子数组进行排序
  // 目的就是处理[[2,6],[1,3],[8,10],[15,18]]这种情况
  // 让它们变成这种[[1,3],[2,6],[8,10],[15,18]]有序的排列
  intervals = intervals.sort( (a: number[], b: number[]) => {
    return a[0] - b[0];
  })

  // 接下来就是不断的两两合并
  for (let i: number = 0; i < intervals.length - 1; i++) {
    let a2: number = intervals[i][1];
    let b1: number = intervals[i+1][0];
    let b2: number = intervals[i+1][1];

    if  (a2 >= b1) { 
      intervals[i][1] = a2 > b2 ? a2 : b2
      intervals.splice(i+1,1)
      i--    // 注意长度要减小
    }
  }

  return intervals
};

// Test
let res: number[][] = merge([[1,3],[2,6],[8,10],[15,18]])
console.log(res)
```



```typescript
// 更快的解法
// 分析：思路基本一致，可能是操作更快
function merge(intervals: number[][]): number[][] {
    
  // 开辟一个新的空二维数组
  const res: number[][] = [];
    
  // 用来判别的标志
  let index: number = -1;
    
  // 先按照区间起始位置排序
  // 这一步功能是按每个子数组首元素大小，对子数组进行排序
  // 目的就是处理[[2,6],[1,3],[8,10],[15,18]]这种情况
  // 让它们变成这种[[1,3],[2,6],[8,10],[15,18]]有序的排列
  intervals.sort((a, b) => a[0] - b[0]);
    
  for (const el of intervals) {
    // 如果结果数组是空的，或者当前区间的起始位置 > 结果数组中最后区间的终止位置，
    // 则不合并，直接将当前区间加入结果数组。
    if (index === -1 || el[0] > res[index][1]) {
      res.push(el);
      index++;
    } else {
      res[index][1] = Math.max(res[index][1], el[1]);
    }
  }
    
  return res;
};
```





## 4. 买卖股票的最佳时机 II(H)

### 题目

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

**示例 2:**

```
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

**示例 3:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

 

**提示：**

- `1 <= prices.length <= 3 * 10 ^ 4`
- `0 <= prices[i] <= 10 ^ 4`



### 解法

#### 考虑拐点的峰谷法

假设给定的数组为：

`[7, 1, 5, 3, 6, 4]`

如果我们在图表上绘制给定数组中的数字，我们将会得到：

![](https://pic.leetcode-cn.com/d447f96d20d1cfded20a5d08993b3658ed08e295ecc9aea300ad5e3f4466e0fe-file_1555699515174)

如果我们分析图表，那么我们的兴趣点是连续的峰和谷。

用数学语言描述为：

$$
TotalProfit= 
i
∑
​	
 (height(peak 
i
​	
 )−height(valley 
i
​	
 ))
$$
关键是我们需要考虑到紧跟谷的每一个峰值以最大化利润。如果我们试图跳过其中一个峰值来获取更多利润，那么我们最终将失去其中一笔交易中获得的利润，从而导致总利润的降低。

例如，在上述情况下，如果我们跳过`peaki`和`peakj` ，试图通过考虑差异较大的点以获取更多的利润，获得的净利润总是会小与包含它们而获得的净利润，因为C总是小于 A+B。

```java
class Solution {
    public int maxProfit(int[] prices) {
        int i = 0;
        int valley = prices[0];
        int peak = prices[0];
        int maxprofit = 0;
        while (i < prices.length - 1) {
            while (i < prices.length - 1 && prices[i] >= prices[i + 1])
                i++;
            valley = prices[i];
            while (i < prices.length - 1 && prices[i] <= prices[i + 1])
                i++;
            peak = prices[i];
            maxprofit += peak - valley;
        }
        return maxprofit;
    }
}
复杂度分析
```

时间复杂度：O(n)。遍历一次。

空间复杂度：O(1)。需要常量的空间。



#### 考虑走势的峰谷法

在这种情况下，我们可以简单地继续在斜坡上爬升并持续增加从连续交易中获得的利润，而不是在谷之后寻找每个峰值。最后，我们将有效地使用峰值和谷值，但我们不需要跟踪峰值和谷值对应的成本以及最大利润，但我们可以直接继续增加加数组的连续数字之间的差值，如果第二个数字大于第一个数字，我们获得的总和将是最大利润。这种方法将简化解决方案。
这个例子可以更清楚地展现上述情况：

[1, 7, 2, 3, 6, 7, 6, 7]

与此数组对应的图形是：

![](https://pic.leetcode-cn.com/6eaf01901108809ca5dfeaef75c9417d6b287c841065525083d1e2aac0ea1de4-file_1555699697692)

从上图中，我们可以观察到 A+B+C的和等于差值 DD 所对应的连续峰和谷的高度之差。

```java
class Solution {
    public int maxProfit(int[] prices) {
        int maxprofit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1])
                maxprofit += prices[i] - prices[i - 1];
        }
        return maxprofit;
    }
}

```

复杂度分析

时间复杂度：O(n)，遍历一次。
空间复杂度：O(1)，需要常量的空间。



### 解答

```typescript
// My Solution
//采用考虑走势的峰谷法
function maxProfit(prices: number[]): number {
  let max: number = 0;

  for (let i: number = 0; i < prices.length - 1; i++) {
    if (prices[i] < prices[i+1]) {
      max += prices[i+1] - prices[i];
    }
  }

  return max;
};

// Test
let arr = [7,1,5,3,6,4];
let res = maxProfit(arr);
console.log(res);
console.log(arr);
```



## 5. 旋转数组(N)

### 题目

给定一个数组，将数组中的元素向右移动 *k* 个位置，其中 *k* 是非负数。

**示例 1:**

```
输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
```

**示例 2:**

```
输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释: 
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
```

**说明:**

- 尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
- 要求使用空间复杂度为 O(1) 的 **原地** 算法。



### 思路

* k即为循环的次数

* 循环里，数组头添加数组尾的元素，然后删除数组尾
* 循环k次



### 解答

```typescript
// My Solution
function rotate(nums: number[], k: number): void {
  for (let i = 1; i <= k; i++) {
    nums.unshift(nums[nums.length-1]);
    nums.pop();
  }
};

// Test
let arr = [-1,-100,3,99];
rotate(arr, 2);
console.log(arr);
```



```typescript
// 优解
// 使用splice一次性删掉，不使用循环，效率更高
function rotate(nums: number[], k: number): void {

    //删除第k个元素开始之后的元素，删除长度为k
    var del = nums.splice(nums.length - k, k);
    //用unshift方法在数组开始添加删除的元素 es6三个点语法将数组转化为参数序列
    nums.unshift(...del);

};
```



## 6. 存在重复元素(E)

### 题目

给定一个整数数组，判断是否存在重复元素。

如果任意一值在数组中出现至少两次，函数返回 `true` 。如果数组中每个元素都不相同，则返回 `false` 。

 

**示例 1:**

```
输入: [1,2,3,1]
输出: true
```

**示例 2:**

```
输入: [1,2,3,4]
输出: false
```

**示例 3:**

```
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```



### 思路

* 用set去重，之后再转为数组
* 比较新旧数组长度，相同则没有重复，减小则有重复



###  解答

```typescript
// My Solution
// 此方法效率最高，但是直接利用封装好的函数，有点投机取巧
// 一般方法就是逐一比对，或者可以考虑排序后比对
function containsDuplicate(nums: number[]): boolean {
  let set = new Set(nums);
  let arr = Array.from(set);

  if (arr.length !== nums.length) {
    return true;
  } else {
    return false;
  }
};

// Test
let arr = [1,2,3,4];
let res = containsDuplicate(arr);
console.log(res);
console.log(arr);
```



## 7. 只出现一次的数字(N)

### 题目

给定一个**非空**整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1:**

```
输入: [2,2,1]
输出: 1
```

**示例 2:**

```
输入: [4,1,2,1,2]
输出: 4
```



### 思路

* 先对数组排序
* 相邻元素比对，如果出现相同的元素，则两个都删掉，循环变量i减2
* 最后剩下的那一个就是答案



### 解答

```typescript
// My Solution
function singleNumber(nums: number[]): number {
  nums = nums.sort( (a, b) => {
    return a-b;
  })

  let flag: number = 0;

  for (let i: number = 0 ; i < nums.length-1; i++) {
    if (nums[i] === nums[i+1]) {
      nums.splice(i, 2);
      i -= 2;
    }
  }

  return nums[0];
};

// Test
let arr = [2,2,1];
let res = singleNumber(arr);
console.log(res);
console.log(arr);
```



```typescript
// 优解
// 运用了异或的知识，是个好解法
function singleNumber(nums: number[]): number {
    let num = 0;
    for (let i = 0; i < nums.length; i++) {
        num = num ^ nums[i];
    }
    return num;
};
```



## 8. 两个数组的交集 II(N)

### 题目

给定两个数组，编写一个函数来计算它们的交集。

**示例 1:**

```
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
```

**示例 2:**

```
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]
```

**说明：**

- 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
- 我们可以不考虑输出结果的顺序。

**进阶:**

- 如果给定的数组已经排好序呢？你将如何优化你的算法？
- 如果 *nums1* 的大小比 *nums2* 小很多，哪种方法更优？
- 如果 *nums2* 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？



### 思路

* 首先排序
* 之后分别用指针，进行比较



###  解答

```typescript
// My Solution
function intersect(nums1: number[], nums2: number[]): number[] {
  let p1: number = 0;
  let p2: number = 0;
  let res: number[] = [];

  nums1.sort( (a, b) => {
    return a-b;
  })

  nums2.sort( (a, b) => {
    return a-b;
  })

  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] === nums2[p2]) {
      res.push(nums1[p1]);
      p1++;
      p2++;
    }

    if (nums1[p1] < nums2[p2]) {
      p1++;
    }

    if (nums1[p1] > nums2[p2]) {
      p2++;
    }
  }

  return res;
};

// Test
let arr1 = [1, 2, 2, 1];
let arr2 = [2, 2]
let res = intersect(arr1, arr2);
console.log(res);
```



```typescript
// 优解，但没有怎么看懂
function intersect(nums1: number[], nums2: number[]): number[] {
  const nums: number[] = []
  // 实际上是定义数组，定义一个确定了[]的数组
  const hash1: { [props: number]: number } = {}

  for (let i of nums1) {
    hash1[i] = (hash1[i] === undefined) ? 1 : hash1[i] + 1
  }
  for (let i of nums2) {
    if (hash1[i]) {
      nums.push(i)
      hash1[i] = hash1[i] - 1
    }
  }

  return nums
};
```



## 9. 加一(N)

### 题目

给定一个由**整数**组成的**非空**数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储**单个**数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

**示例 1:**

```
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```

**示例 2:**

```
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```



### 思路

* 转换成字符串，在变成number，之后+1，变回字符串，再变成number数组



### 解答

```typescript
// My Solution
// 此解法其实有错误，比如当为[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]
// 转换成Number后已经超出了范围，所以结果是错的
function plusOne(digits: number[]): number[] {
  let str: string = digits.join("");
  console.log(str);

  let num: number = Number(str) + 1;
  console.log(num);

  let newstr: string[] = String(num).split('');
  console.log(newstr);

  let res: number[] = [];

  newstr.forEach( (val) => {
    res.push(Number(val));
  })

  return res;
};

// Test
let arr1 = [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3];
let res = plusOne(arr1);
console.log(res);
```



```typescript
// 优解
function plusOne(digits: number[]): number[] {
    const len = digits.length
    if (digits[len-1] != 9) {
        digits[len-1] = digits[len-1]+1
        return digits
    } else {
        if (len == 1) {
            return [1,0]
        } else {
            digits.splice(-1,1)   
            return plusOne(digits).concat(0)
        }
    }
};
```



## 10.缺失数字(H)

### 题目

给定一个包含 `0, 1, 2, ..., n` 中 *n* 个数的序列，找出 0 .. *n* 中没有出现在序列中的那个数。

 

**示例 1:**

```
输入: [3,0,1]
输出: 2
```

**示例 2:**

```
输入: [9,6,4,2,3,5,7,0,1]
输出: 8
```

 

**说明:**
你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?



### 解法

* 找到其中的规律，先排序
* 如果是连续的，则当前的值为前一个值加1
* 以此为规律进行解答



### 解答

```Java
class Solution {
    public int missingNumber(int[] nums) {
        Arrays.sort(nums);

        // 判断 n 是否出现在末位
        if (nums[nums.length-1] != nums.length) {
            return nums.length;
        }
        // 判断 0 是否出现在首位
        else if (nums[0] != 0) {
            return 0;
        }

        // 此时缺失的数字一定在 (0, n) 中
        for (int i = 1; i < nums.length; i++) {
            int expectedNum = nums[i-1] + 1;
            if (nums[i] != expectedNum) {
                return expectedNum;
            }
        }

        // 未缺失任何数字（保证函数有返回值）
        return -1;
    }
}
```



```java
// 优解
// 这个解法利用了另一个规律，先假定是没有缺少的，先求出这个连续数列的和
// 用和减去每个数，多出来的就是差的

class Solution {
    public int missingNumber(int[] nums) {
        int length = nums.length;
        int sum = (length) * (length+1) / 2;
        for (int num : nums) {
            sum -= num;
        }
        return sum;
    }
}
```



## 11. 删除排序数组中的重复项 II(H)

### 题目

给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:

```
给定 nums = [1,1,1,2,2,3],

函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。

你不需要考虑数组中超出新长度后面的元素。
```

示例 2:

```
给定 nums = [0,0,1,1,1,1,2,3,3],

函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。

你不需要考虑数组中超出新长度后面的元素。
```

说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```



### 解法

* 双指针，两个指针的距离隔着一个元素



### 解答

```typescript
// My Solution
function removeDuplicates(nums: number[]): number {
  let n = nums.length
  // 长度小于3直接返回
  if (n < 3) {
    return n
  }
  // 定义count
  let count = 1
  for (let i = 2; i < n; i++) {
    if (nums[i] !== nums[count - 1]) {
      count++
      nums[count] = nums[i]
    }
  }
  return count + 1;
}

// Test
let arr = [0, 0, 1, 1, 1, 1, 2, 3, 3];
let res = removeDuplicates(arr);
console.log(res);
```



# 二维数组



## 1. 旋转图像(N)

### 题目

给定一个 *n* × *n* 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

**说明：**

你必须在**[原地](https://baike.baidu.com/item/原地算法)**旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要**使用另一个矩阵来旋转图像。

**示例 1:**

```
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**示例 2:**

```
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```



### 思路

* 观察规律

```
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],
```

* 先变成转置矩阵

```
[ 
  [1,4,7], 
  [2,5,8], 
  [3,6,9] 
]
```

* 之后每行前半部分的纵坐标交换

```
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```



### 解答

```typescript
// My Solution
// 时间复杂度为2(n^2)
function rotate(matrix: number[][]): void {
  for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = i; j < matrix[i].length; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = 0; j < Math.floor(matrix[i].length/2); j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[i][matrix[i].length-1-j];
      matrix[i][matrix[i].length-1-j] = temp;
    }
  }
};

// Test
let arr1 = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

rotate(arr1);
console.log(arr1)
```



```typescript
// 优解
// 它时间复杂度为n^2，比我的方法快了一倍，但不好理解
function rotate(matrix: number[][]): void {

	let len = matrix.length-1;
	let count = Math.floor(len / 2);
	for (let i = 0; i <= count; i++)
	{ 
        let size = len - i;
		for (let n = i; n < size; n++)
		{ 
			let temp = matrix[i][n];
			matrix[i][n] = matrix[len - n][i];
			matrix[len - n][i] = matrix[len - i][len - n];
			matrix[len - i][len - n] = matrix[n][len - i];
			matrix[n][len - i] = temp;
		}	
	}	
};
```



## 2. 零矩阵(H)

### 题目

编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

 

**示例 1：**

```
输入：
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出：
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**示例 2：**

```
输入：
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出：
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```



### 解法

* 循环里实时清除行
* 保存列下标，最后统一清除列



### 解答

```typescript
// 好理解
function setZeroes(matrix: number[][]): void {
  // 定义清除列
  let column = []; 
  for (let i = 0; i < matrix.length; i++) {
    // 定义清除行
    let row = null;

    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        row = i;
        column.push(j);
      }
    }

    // 每循环一次，实时清除行
    if (row != null) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  // 最后再清除列
  for (let i = 0; i < matrix.length; i++) {
    for (let j of column) {
      matrix[i][j] = 0;
    }
  }
}

// Test
let arr = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
let res = setZeroes(arr);
console.log(arr);
```



```typescript
// 更高的效率解法
function setZeroes(matrix: number[][]): void {
  // 定义行和列用于存储
  const xs: number[] = [];
  const ys: number[] = [];

  // 遍历
  matrix.forEach((nums, y) => {
    nums.forEach((num, x) => {
      // 如果里面没有0，则存入
      if (num === 0) {
        !xs.includes(x) && xs.push(x);
        !ys.includes(y) && ys.push(y);
      }
    });
  });

  // 列清零
  ys.forEach((y) => {
    matrix[y].fill(0);
  });

  // 行清零(排除已清零的列，提高效率)
  matrix
    .filter((nums, index) => !ys.includes(index))
    .forEach((nums) => {
      xs.forEach((x) => {
        nums[x] = 0;
      });
    });
}
// Test
let arr = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
let res = setZeroes(arr);
console.log(arr);
```



## 3. 对角线遍历(H)

### 题目

给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。

 

**示例:**

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

输出:  [1,2,4,7,5,3,6,8,9]

解释:
```

 

**说明:**

1. 给定矩阵中的元素总数不会超过 100000 。



### 解法

```
找规律

(0, 0)  m+n=0  正序

(0, 1)  m+n=1  倒叙
(1, 0)

(2, 0)  m+n=2  正序
(1, 1)
(0, 2)

(1, 2)  m+n=3  倒叙
(2, 1)

(2, 2)  m+n=4  正序
```



### 解答

```typescript
// MySolution
function findDiagonalOrder(matrix: number[][]): number[] {
  if (matrix.length === 0) {
    return []
  }
  
  const newArr = []
  let xlength = matrix[0].length, ylength = matrix.length
  for (let i = 1; i < xlength + ylength; i++) {
    let xMax = i % 2 === 0 ? ylength : xlength
    let yMax = i % 2 === 0 ? xlength : ylength
    for (let x = 0; x < i; x++) {
      let y = i - x - 1
      if (x >= xMax || y >= yMax) continue
      newArr.push(i % 2 === 0 ? matrix[x][y] : matrix[y][x])
    }
  }
  return newArr

};

// Test
let arr = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
let res = findDiagonalOrder(arr);
console.log(res);
```



## 4. 杨辉三角(N)

### 题目

给定一个非负整数 *numRows，*生成杨辉三角的前 *numRows* 行。

![img](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

在杨辉三角中，每个数是它左上方和右上方的数的和。

**示例:**

```
输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```



### 思路 

* 找规律，从第三行开始，除了一头一尾是1，其他值(下标记为`i`)均是上一个数组的`i`和`i-1`的值之和
* 注意临界情况，长度为0，1，2的时候



### 解答

```typescript
// MySolution
function generate(numRows: number): number[][] {
  let arr1 = [1];
  let arr2 = [1,1];
  let res: number[][] = [];

  if (numRows === 0) {
    return [];
  }

  if (numRows === 1) {
    return [[1]];
  }

  if (numRows === 2) {
    return [[1],[1,1]];
  }

  res.push(arr1);
  res.push(arr2);

  // 从第三行开始
  for (let i = 2; i < numRows; i++) {
    // 开辟一个新数组，长度为当前行数
    let newArr = [];
    newArr.length = i+1;

    // 一头一尾值为1
    newArr[0] = newArr[newArr.length-1] = 1;

    // 找上一行的对应下标，求值
    for (let j = 1; j < newArr.length-1; j++) {
      newArr[j] = res[res.length-1][j] + res[res.length-1][j-1];
    }
    res.push(newArr);
  }

  return res;
};

// Test
let number = 3;
let res = generate(number);
console.log(res);
```



## 5.  杨辉三角 II(N)

### 题目

给定一个非负索引 *k*，其中 *k* ≤ 33，返回杨辉三角的第 *k* 行。

![img](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

在杨辉三角中，每个数是它左上方和右上方的数的和。

**示例:**

```
输入: 3
输出: [1,3,3,1]
```

**进阶：**

你可以优化你的算法到 *O*(*k*) 空间复杂度吗？



### 思路

* 和上一题一样，改变返回值即可
* 特别注意，本题的下标从0开始，忽略了[]的情况



### 解答

```typescript
// MySolution
function getRow(rowIndex: number): number[] {
  let arr0 = [1];
  let arr1 = [1,1];
  let res: number[][] = [];

  if (rowIndex === 0) {
    return arr0;
  }

  if (rowIndex === 1) {
    return arr1;
  }

  res.push(arr0);
  res.push(arr1);

  // 从第三行开始
  for (let i = 2; i <= rowIndex; i++) {
    // 开辟一个新数组，长度为当前行数
    let newArr = [];
    newArr.length = i+1;

    // 一头一尾值为1
    newArr[0] = newArr[newArr.length-1] = 1;

    // 找上一行的对应下标，求值
    for (let j = 1; j < newArr.length-1; j++) {
      newArr[j] = res[res.length-1][j] + res[res.length-1][j-1];
    }
    res.push(newArr);
  }

  return res[res.length-1];
};

// Test
let number = 3;
let res = getRow(number);
console.log(res);
```



```typescript
// 优解，时间复杂度为线性
// 使用了递归，好方法
function getRow(rowIndex: number): number[] {
    let result: number[] = [];
    // 讨论特殊情况
    if (rowIndex === 0) {
        return [1];
    }
    if (rowIndex === 1) {
        return [1, 1];
    }
    if (rowIndex === 2) {
        return [1, 2, 1];
    }
    // 递归调用，得到上一行的值
    const lastRow = getRow(rowIndex - 1);
    // 求出这一行
    for (let i = 0; i <= rowIndex; ++i) {
        if (i === 0 || i === rowIndex) {
            result.push(1);
        } else {
            result.push(lastRow[i - 1] + lastRow[i]);
        }
    }
    return result;
};
```

