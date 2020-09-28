# 动态规划

## 1. 动态规划题目类型

### 计数
有多少种方式走到右下角

有多少种方法选出k个数使得和为Sum

### 求最大最小值

从左上角走到右下角路径的最大数字和

最长上升子序列长度

### 求存在性

取石子游戏，先手是否必胜

能不能选出k个数使得和是Sum



## 2. 动态规划解题步骤

### 确定状态

简单的说，就是解动态规划时需要开一个数组，数组的每个元素f[i]或者f[i][j]代表什么，类似解数学题中，xyz代表什么一样，具体分为下面两个步骤：

-------研究最优策略的最后一步

-------化为子问题

### 转移方程

根据子问题定义直接得到

### 初始条件和边界情况

初始条件一般都是a[0]、a[1]这种，多看看

边界条件主要是看数组的边界，数组越不越界

### 计算顺序

利用之前的计算结果



## 3. 硬币问题(最值类H)

###  题目

有三种硬币，面值2.5.7，买一本书需要27元，如何用最少的硬币整好付清。



### 分析

这是一个求最大最小值问题，可用动态规划来求解。

#### 确定状态

1.最后一步

虽然我们不知道最优策略是什么，但是最优策略一定是k枚硬币a1,a2…ak加起来等于27

所以一定有一枚最后的硬币：ak

除掉这枚硬币，前面硬币的面值相加起来是27-ak，如图

2.化为子问题

所以就将原问题转化为了子问题：

原问题是最少用多少枚硬币拼出27（k枚）

子问题是最少用多少枚硬币拼出27-ak（k-1枚）

**经过这两歩，得出状态：f[X]=最少用多少枚硬币拼出X**

#### 转移方程

设状态f[X]=最少用多少枚硬币拼出X
转移方程如下:

![](https://img-blog.csdnimg.cn/20200711131013186.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDU1MDk2Mw==,size_16,color_FFFFFF,t_70)



这时，可以用递归进行解题，大致如下:

![](https://img-blog.csdnimg.cn/20200711131243857.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDU1MDk2Mw==,size_16,color_FFFFFF,t_70)

但是有一个问题，递归是从上到下进行计算的，这样的话会产生大量的重复运算

![](https://img-blog.csdnimg.cn/20200711131552928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDU1MDk2Mw==,size_16,color_FFFFFF,t_70)

所以说，这不是一个好的解法，解决方法就是将计算结果保存下来，改变计算顺序，我们接着来看。

#### 初始条件和边界情况
边界条件X-2，X-5，X-7小于0时，应该进行处理，这种情况其实就是拼不出来的情况，定义为正无穷

初始条件一般就是根据转移方程计算不出来的值，从转移方程变量为0或1来选，根据题目进行分析，这个题目的初始条件就是f[0]=1，代入公式的话应该f[0]为正无穷，显然错误，所以自己定义f[0]=0

#### 计算顺序

这个题目应该是正序的，当我们计算到f[X]时，f[X-2],f[X-5],f[X-7]都已经得到结果了



### 解答

```java
// A数组存储硬币金额，M代表商品价值
public static int coinChange(int[] A, int M) {
    int[] f = new int[M + 1];
    f[0] = 0;

    for (int i = 1; i <= M; i++) {
        f[i] = Integer.MAX_VALUE;
        for (int j = 0; j < A.length; j++) {
            if (i >= A[j] && f[i - A[j]] != Integer.MAX_VALUE) {
                f[i] = Math.min(f[i], f[i - A[j]] + 1);
            }
        }
    }

    if (f[M] == Integer.MAX_VALUE) {
        f[M] = -1;
    }

    return f[M];
}
```

## 4. 爬楼梯(计数类E)

### 题目

假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：**给定 *n* 是一个正整数。

**示例 1：**

```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

**示例 2：**

```
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```



### 分析

我们用 f(x)表示爬到第 x 级台阶的方案数，考虑最后一步可能跨了一级台阶，也可能跨了两级台阶，所以我们可以列出如下式子：

它意味着爬到
$$
f(x) = f(x - 1) + f(x - 2)
$$
第 x 级台阶的方案数是爬到第 x−1 级台阶的方案数和爬到第 x−2 级台阶的方案数的和。很好理解，因为每次只能爬 1 级或 2 级，所以 f(x) 只能从 f(x - 1) 和 f(x - 2) 转移过来，而这里要统计方案总数，我们就需要对这两项的贡献求和。

以上是动态规划的转移方程，下面我们来讨论边界条件。我们是从第 00 级开始爬的，所以从第 00 级爬到第 00 级我们可以看作只有一种方案，即 f(0) = 1；从第 00 级到第 11 级也只有一种方案，即爬一级，f(1) = 1。这两个作为边界条件就可以继续向后推导出第 n 级的正确结果。我们不妨写几项来验证一下，根据转移方程得到 f(2) = 2，f(3) = 3，f(4) = 5......我们把这些情况都枚举出来，发现计算的结果是正确的。

我们不难通过转移方程和边界条件给出一个时间复杂度和空间复杂度都是 O(n) 的实现，但是由于这里的 f(x) 只和 f(x - 1) 与 f(x - 2) 有关，所以我们可以用「滚动数组思想」把空间复杂度优化成 O(1)。下面第二个代码块中给出的就是这种实现。



### 解答

```typescript
// My Solution
function climbStairs(n: number): number {
  let arr = [];
  arr.length = n+1;

  arr[0] = 1
  arr[1] = 1

  for (let i = 2; i < arr.length; i++) {
    arr[i] = arr[i-1]+arr[i-2]
  }

  return arr[n];
};

// Test
let number = 4;
let res = climbStairs(number);
console.log(res);
```



```typescript
// 滚动数组思想
function climbStairs(n: number): number {
    let p: number = 0, q: number = 0, r: number = 1;
    for (let i = 1; i <= n; ++i) {
        p = q; 
        q = r; 
        r = p + q;
    }
    return r;
};
```



## 5. 买卖股票的最佳时机(最值类H)

### 题目

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

 

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```



### 分析

从第2项开始遍历，逐项对比，遇到价位更低的股票就将股票更换，遇到价位更高的股票就记录差价，最终输出最高差价即可。

Hint：本题也可以不用动态规划做，画图形即可。



### 解答

```typescript
// My Solution
function maxProfit(prices: number[]): number {
  let res = 0;
  let min = prices[0]

  for (let i = 1; i < prices.length; i++) {
    console.log(prices[i], prices[i-1], res)
    if (prices[i] > min && (prices[i] - min > res)) {
      res = prices[i] - min
    }
    else if (prices[i] < min) {
      min = prices[i]
    }
  }

  return res
};

// Test
let arr = [7,1,5,3,6,4];
let res = maxProfit(arr);
console.log(res);
```



```typescript
// 更好的写法，本质仍是动态规划
function maxProfit(prices: number[]): number {
    let min = Infinity;
    let profit = 0;
    prices.forEach(price=>{
        min = Math.min(min,price);
        profit = Math.max(profit,price-min);
    })
    return profit;
};
```



## 6. 最大子序和(最值类H)

### 题目

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例:**

```
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**进阶:**

如果你已经实现复杂度为 O(*n*) 的解法，尝试使用更为精妙的分治法求解。



### 分析

假设 nums 数组的长度是 n，下标从 0 到 n - 1。

我们用 $a_i$ 代表 `nums[i]`，用 f(i) 代表以第 i 个数结尾的「连续子数组的最大和」，那么很显然我们要求的答案就是：
$$
\max_{0 \leq i \leq n - 1} \{ f(i) \}
$$
  因此我们只需要求出每个位置的 f(i)，然后返回 f 数组中的最大值即可。那么我们如何求 f(i) 呢？我们可以考虑 $a_i$ 单独成为一段还是加入 f(i - 1)对应的那一段，这取决于  $a_i$ 和 $f(i−1)+a_i$的大小，我们希望获得一个比较大的，于是可以写出这样的动态规划转移方程：
$$
f(i)=max\{f(i−1)+a_i, a_i\}
$$
不难给出一个时间复杂度 O(n)、空间复杂度 O(n)的实现，即用一个 f 数组来保存 f(i)的值，用一个循环求出所有 f(i)。考虑到 f(i) 只和 f(i - 1)相关，于是我们可以只用一个变量 pre 来维护对于当前 f(i) 的 f(i - 1) 的值是多少，从而让空间复杂度降低到 O(1)，这有点类似「滚动数组」的思想。



### 解答

```typescript
// 动态规划
function maxSubArray(nums: number[]): number {
  let pre = 0
  let maxAns = nums[0]
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};
// Test
let arr = [-2,1,-3,4,-1,2,1,-5,4]
let res = maxSubArray(arr);
console.log(res);
```



## 7. 打家劫舍(最值类H)

### 题目

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。

 

**示例 1：**

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

 

**提示：**

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 400`



### 分析

首先考虑最简单的情况。如果只有一间房屋，则偷窃该房屋，可以偷窃到最高总金额。如果只有两间房屋，则由于两间房屋相邻，不能同时偷窃，只能偷窃其中的一间房屋，因此选择其中金额较高的房屋进行偷窃，可以偷窃到最高总金额。

如果房屋数量大于两间，应该如何计算能够偷窃到的最高总金额呢？对于第 $k~(k>2)$间房屋，有两个选项：

偷窃第 k 间房屋，那么就不能偷窃第 k-1 间房屋，偷窃总金额为前 k-2间房屋的最高总金额与第 k 间房屋的金额之和。

不偷窃第 k 间房屋，偷窃总金额为前 k-1间房屋的最高总金额。

在两个选项中选择偷窃总金额较大的选项，该选项对应的偷窃总金额即为前 k 间房屋能偷窃到的最高总金额。

用 $dp[i]$表示前 i间房屋能偷窃到的最高总金额，那么就有如下的状态转移方程：

$$
\textit{dp}[i] = \max(\textit{dp}[i-2]+\textit{nums}[i], \textit{dp}[i-1])
$$
边界条件为：

$$
{ 
dp[0]=nums[0],
dp[1]=max(nums[0],nums[1])
}
$$
​	

只有一间房屋，则偷窃该房屋
只有两间房屋，选择其中金额较高的房屋进行偷窃
	

### 解答

```java
class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        int length = nums.length;
        if (length == 1) {
            return nums[0];
        }
        int[] dp = new int[length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < length; i++) {
            dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
        }
        return dp[length - 1];
    }
}
```



## 8. 按摩师(最值类)

### 题目

一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。

注意：本题相对原题稍作改动

 

示例 1：

```
输入： [1,2,3,1]
输出： 4
解释： 选择 1 号预约和 3 号预约，总时长 = 1 + 3 = 4。
```

示例 2：

```
输入： [2,7,9,3,1]
输出： 12
解释： 选择 1 号预约、 3 号预约和 5 号预约，总时长 = 2 + 9 + 1 = 12。
```

示例 3：

```
输入： [2,1,4,5,3,1,1,3]
输出： 12
解释： 选择 1 号预约、 3 号预约、 5 号预约和 8 号预约，总时长 = 2 + 4 + 3 + 3 = 12。
```



### 分析

* 考虑一次过程，当前本次与i-2次的和与i-1次比较，取最大值
* 转移方程

$$
dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
$$

* 边界条件：
* * 空数组的情况
  * 第一次dp[0] = 1
  * 第二次dp[1] = max(dp[0], dp[1])



### 解答

```typescript
// My Solution
function massage(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }


  let f = new Array<number>(nums.length)

  if (nums.length === 1) {
    return nums[0]
  }

  f[0] = nums[0] 
  f[1] = Math.max(nums[0], nums[1])


  for (let i = 2; i < nums.length; i++) {
    f[i] = Math.max(f[i-2]+nums[i], f[i-1])
  }

  return f[f.length - 1]
};

// Test
let arr = [1,2,3,1]
let res = massage(arr);
console.log(res);
```



```typescript
// 优解，更好的写法
// 少写2个if语句
// 利用TS特性，空数组里取元素，默认为0
function massage(nums: number[]): number {
    if(nums.length ===0) return 0;
    const dp=[nums[0], Math.max(nums[0],nums[1])];

    for(let i=2;i<nums.length;i++){
        dp[i] = Math.max(dp[i-2]+nums[i],dp[i-1]);
    }

    return dp[nums.length-1];
};
```



## 9. 三步问题(计数类N)

### 题目

有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。

示例1:

```
 输入：n = 3 
 输出：4
 说明: 有四种走法
```

示例2:

```
 输入：n = 5
 输出：13
```

提示:

n范围在[1, 1000000]之间



### 分析

转移方程

dp[i] = dp[i-1] + dp[i-2] + dp[i-3]

边界条件
dp[0] = 1
dp[1] = 1
dp[2] = 2



### 解答

```typescript
// My Solution
function waysToStep(n: number): number {
  let m = 1e9+7
  let f = new Array<number>()

  f[0] = 1
  f[1] = 1
  f[2] = 2

  for (let i = 3; i <= n; i++) {
    f[i] = (f[i-1] + f[i-2] + f[i-3]) % m
  }

  return f[n]
};

// Test
let num = 5
let res = waysToStep(num)
console.log(res)
```



## 10. 使用最小花费爬楼梯(最值类N)

### 题目

数组的每个索引作为一个阶梯，第 i个阶梯对应着一个非负数的体力花费值 cost[i](索引从0开始)。

每当你爬上一个阶梯你都要花费对应的体力花费值，然后你可以选择继续爬一个阶梯或者爬两个阶梯。

您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。

示例 1:

```
输入: cost = [10, 15, 20]
输出: 15
解释: 最低花费是从cost[1]开始，然后走两步即可到阶梯顶，一共花费15。
```


 示例 2:

```
输入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
输出: 6
解释: 最低花费方式是从cost[0]开始，逐个经过那些1，跳过cost[3]，一共花费6。
```

注意：

cost 的长度将会在 [2, 1000]。
每一个 cost[i] 将会是一个Integer类型，范围为 [0, 999]。



### 分析

* f[i]为当前最小花费
* 转移方程：`f[i] = cost[i] + Math.min(f[i-1], f[i-2])`



### 解答

```typescript
// My Solution
function minCostClimbingStairs(cost: number[]): number {
  let f = [];

  f[0] = cost[0]
  f[1] = cost[1]

  for (let i = 2; i < cost.length; i++) {
    f[i] = cost[i] + Math.min(f[i-1], f[i-2])
  }

  return Math.min(f[cost.length-1], f[cost.length-2])
};

// Test
let arr = [0,0,0,1]
let res = minCostClimbingStairs(arr)
console.log(res)
```



## 11. 除数博弈(存在类H)

### 题目

爱丽丝和鲍勃一起玩游戏，他们轮流行动。爱丽丝先手开局。

最初，黑板上有一个数字 N 。在每个玩家的回合，玩家需要执行以下操作：

* 选出任一 x，满足 0 < x < N 且 N % x == 0 。
* 用 N - x 替换黑板上的数字 N 。
* 如果玩家无法执行这些操作，就会输掉游戏。

只有在爱丽丝在游戏中取得胜利时才返回 True，否则返回 False。假设两个玩家都以最佳状态参与游戏。

 

### 分析

通过题意可知： 当N为1时，爱丽丝必定输；N为2时，爱丽丝必定赢

因此设dp[n]的含义为 : 

爱丽丝得到的数为n时, 爱丽丝是否能赢.

由之前分析, dp[1]为false, dp[2]为true

假设dp数组的前 x-1 项都是确定的, 那么对于dp[x]为true的充分必要条件就是 : 

存在一个数 v, 使得 i % v = 0 的同时 dp[x-v] 为 false

根据这个就可以推出 dp[2~N] 的值，最后返回 dp[N]



###  解答

```typescript
// 优解
function divisorGame(N: number): boolean {
  var dp = [false, false];
  for (var i = 2; i <= N; i++) {
    dp[dp.length] = false;
    for (var v = 1; v * v <= N; v++) {
      if (i % v === 0 && dp[i - v] === false) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[N];
}

// Test
let num = 20;
let res = divisorGame(num);
console.log(res);
```



## 12. 区域和检索 - 数组不可变(计数类N)

### 题目

给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。

示例：

```
给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3
```

说明:

你可以假设数组不可变。
会多次调用 sumRange 方法。



### 分析

* 此题属于隐藏很深的动态规划，其实一般方法也可以做，我的做法就是一般方法
* 动态规划，先开一个数组，动态规划记录下每个阶段和的值
* sumRange函数只需要返回对应索引的差值即可



### 解答

```typescript
// My Solution
class NumArray {
  public nums: number[];

  constructor(nums: number[]) {
    this.nums = nums
    
  }
  
  // 通过正常遍历思想解答
  sumRange(i: number, j: number): number {
    let sum: number = 0;
    for (let k = i; k <=j ; k++) {
      sum += this.nums[k]
    }

    return sum
  }
}
```



```typescript
class NumArray {
    private sum: number[]

    constructor(nums: number[]) {
        this.sum = new Array(nums.length + 1).fill(0)

        for (let i = 0; i < nums.length; i++) {
            this.sum[i + 1] = this.sum[i] + nums[i]
        }
    }

    sumRange(i: number, j: number): number {
        return this.sum[j + 1] - this.sum[i]
    }
}
```

