# 双指针解决问题

## 1. 双指针技巧 1

有时我们会使用两个指针进行迭代。

![1.png](https://pic.leetcode-cn.com/bfdf27723d1b26ee06a56adbf6206fb9d1f7446e297ce05e74e0275b268cd945-1.png)

### 示例

让我们从一个经典问题开始：

> 反转数组中的元素。比如数组为 `['l', 'e', 'e', 't', 'c', 'o', 'd', 'e']`，反转之后变为 `['e', 'd', 'o', 'c', 't', 'e', 'e', 'l']`。

使用双指针技巧，其思想是分别将两个指针分别指向数组的开头及末尾，然后将其指向的元素进行交换，再将指针向中间移动一步，继续交换，直到这两个指针相遇。

![2.gif](https://pic.leetcode-cn.com/84f9f1fce23655fcc653179b26d9800edf54858f790be1bc7573eb228f2aac00-2.gif)

### 小结

---

我们来总结一下，使用双指针的典型场景之一是你想要

> 从两端向中间迭代数组。

这时你可以使用双指针技巧：

> 一个指针从头部开始，而另一个指针从尾部开始。

这种技巧经常再排序数组中使用。

## 2. 双指针技巧 2

有时，我们可以使用两个不同步的指针来解决问题，即快慢指针。与方法 1 不同的是，两个指针的运动方向是相同的，而非相反。

### 示例

让我们从一个经典问题开始：

> 给你一个数组 `nums` 和一个值 `val`，你需要 **原地** 移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

如果我们没有空间复杂度上的限制，那就更容易了。我们可以初始化一个新的数组来存储答案。如果元素不等于给定的目标值，则迭代原始数组并将元素添加到新的数组中。

![3.png](https://pic.leetcode-cn.com/3f8b23cdbbb25f753c89a309a2860081e0dbb7d7097a2664100849424b07235a-3.png)

实际上，它相当于使用了两个指针，一个用于原始数组的迭代，另一个总是指向新数组的最后一个位置。

### 考虑空间限制

如果我们不使用额外的数组，只是在原数组上进行操作呢？

此时，我们就可以采用快慢指针的思想：初始化一个快指针 `fast` 和一个慢指针 `slow`，`fast` 每次移动一步，而 `slow` 只当 `fast` 指向的值不等于 `val` 时才移动一步。

![4.gif](https://pic.leetcode-cn.com/353657e00bf49ad5c6aeb8e97414d1d610083acdb580e7c2b0fe036a523129f5-4.gif)

### 小结

这是你需要使用双指针技巧的另一种非常常见的情况：

> 同时有一个慢指针和一个快指针。

解决这类问题的关键是:

> 确定两个指针的移动策略。

与前一个场景类似，你有时可能需要在使用双指针技巧之前对数组进行排序，也可能需要运用贪心法则来决定你的运动策略。

## 3. 反转字符串(N)

### 题目

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `char[]` 的形式给出。

不要给另外的数组分配额外的空间，你必须**[原地](https://baike.baidu.com/item/原地算法)修改输入数组**、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 [ASCII](https://baike.baidu.com/item/ASCII) 码表中的可打印字符。

**示例 1：**

```
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

### 思路

- 一头一尾指针，用 while 循环
- 也可以一个指针，利用数组长度关系构造另一个指针， 用 while 循环

### 解答

```typescript
// My Solution
function reverseString(s: string[]): void {
  let left: number = 0;
  let right: number = s.length - 1;
  let temp: string = "";

  while (left < right) {
    temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
}

// Test
let s: string[] = ["h", "e", "l", "l", "o"];
reverseString(s);
console.log(s);
```

```typescript
// 一个指针，思路一样，速度更快些
function reverseString(s: string[]): void {
  let len = s.length - 1;
  let count = Math.floor(len / 2);
  for (let i = 0; i <= count; i++) {
    let temp = s[i];
    s[i] = s[len - i];
    s[len - i] = temp;
  }
}
```

```typescript
// 超简单算法
function reverseString(s: string[]): void {
  s.reverse();
}
```

## 4. 数组拆分 I(N)

### 题目

给定长度为 **2n** 的数组, 你的任务是将这些数分成 **n** 对, 例如 `(a1, b1), (a2, b2), ..., (an, bn) `，使得从 1 到 n 的`min(ai, bi)` 总和最大。

**示例 1:**

```
输入: [1,4,3,2]

输出: 4
解释: n 等于 2, 最大总和为 4 = min(1, 2) + min(3, 4).
```

**提示:**

1. **n** 是正整数,范围在 [1, 10000].
2. 数组中的元素范围在 [-10000, 10000].

### 思路

- 观察分析，就是对数组排序后，取相邻的两项求最小

### 解答

```typescript
// My Solution
function arrayPairSum(nums: number[]): number {
  nums = nums.sort((a, b) => {
    return a - b;
  });

  let sum: number = 0;

  for (let i: number = 0; i < nums.length; i += 2) {
    sum += nums[i];
  }

  return sum;
}

// Test
let res = arrayPairSum([1, 4, 3, 2]);
console.log(res);
```

## 5. 两数之和 II - 输入有序数组(H)

### 题目

给定一个已按照**升序排列** 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2*。*

**说明:**

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

**示例:**

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

### 思路

- 使用快慢指针法，建立两个循环，时间复杂度为`O(n^2)`
- 注意边界，数组长度小于等于 1 的情况直接返回

### 解答

```typescript
// My Solution
function twoSum(numbers: number[], target: number): number[] {
  // 考虑边界情况
  if (numbers.length <= 1) {
    return [];
  }

  // 定义快慢指针
  let head: number = 0;
  let tail: number = head + 1;

  for (let i: number = 0; i < numbers.length; i++) {
    while (tail !== numbers.length) {
      if (numbers[head] + numbers[tail] === target) {
        // 特别注意它返回的答案下标从1开始
        return [head + 1, tail + 1];
      }
      tail++;
    }
    head++;
    tail = head + 1;
  }

  return [];
}

// Test
let res = twoSum([2, 7, 11, 15], 9);
console.log(res);
```

```typescript
// 优解
// 通过有序这个规律，运用前后指针，巧妙的降低了时间复杂度
function twoSum(numbers: number[], target: number): number[] {
  // 定义头尾双指针
  let i: number = 0;
  let j: number = numbers.length - 1;

  // 当i >= j时退出循环
  while (i < j) {
    let tmp: number = numbers[i] + numbers[j];
    if (tmp === target) {
      return [++i, ++j];
    }

    // 这一步为关键
    // 因为是升序，大于说明末位要减1，小于说明开头要加1
    tmp > target ? j-- : i++;
  }
  return [];
}

// Test
let res = twoSum([2, 7, 11, 15], 9);
console.log(res);
```

## 6. 移除元素(N)

### 题目

给你一个数组 _nums_ 和一个值 _val_，你需要 **[原地](https://baike.baidu.com/item/原地算法)** 移除所有数值等于 _val_ 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组**。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**示例 1:**

```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### 思路

- 定义一个指针，如果其数组值与 val 匹配，则所有后面元素前移，然后长度减一，指针自身减一

### 解答

```typescript
// My Solution
// 注释部分就是双指针的写法
function removeElement(nums: number[], val: number): number {
  let fast: number = 0;
  // let slow: number = 0;

  for (fast = 0; fast < nums.length; fast++) {
    if (nums[fast] === val) {
      for (let i: number = fast; i < nums.length - 1; i++) {
        nums[i] = nums[i + 1];
      }
      nums.length--;
      // slow--;
      fast--;
    }
    // if (nums[fast] !== val) {
    //   slow++;
    // }
  }

  return nums.length;
}

// Test
let arr = [0, 1, 2, 2, 3, 0, 4, 2];
let res = removeElement(arr, 2);
console.log(res);
console.log(arr);
```

```typescript
// 优解
// 原理一样，用了splice()提高效率
function removeElement(nums: number[], val: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}
```

## 7. 最大连续 1 的个数(N)

### 题目

给定一个二进制数组， 计算其中最大连续 1 的个数。

**示例 1:**

```
输入: [1,1,0,1,1,1]
输出: 3
解释: 开头的两位和最后的三位都是连续1，所以最大连续1的个数是 3.
```

**注意：**

- 输入的数组只包含 `0` 和`1`。
- 输入数组的长度是正整数，且不超过 10,000。

### 思路

- 设计一个计数器，统计连续 1 的个数
- 设计一个结果值，记录最大的计数

### 解答

```typescript
// My Solution
function findMaxConsecutiveOnes(nums: number[]): number {
  let result: number = 0;
  let count: number = 0;

  for (let i: number = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      count++;
    } else {
      if (count > result) {
        result = count;
      }
      count = 0;
    }
  }

  // 关键之处，如果一直到末尾一直是连1的话，会导致result没有更新
  return result > count ? result : count;
}

// Test
let arr = [1, 1, 0, 1, 1, 1];
let res = findMaxConsecutiveOnes(arr);
console.log(res);
console.log(arr);
```

## 8. 长度最小的子数组(H)

### 题目

给定一个含有 **n** 个正整数的数组和一个正整数 **s ，**找出该数组中满足其和 **≥ s** 的长度最小的子数组，并返回其长度**。**如果不存在符合条件的子数组，返回 0。

**示例：**

```
输入：s = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

**进阶：**

- 如果你已经完成了 _O_(_n_) 时间复杂度的解法, 请尝试 _O_(_n_ log _n_) 时间复杂度的解法。

### 思路

- 建立两个循环，逐一比较

### 解答

```typescript
// My Solution
function minSubArrayLen(s: number, nums: number[]): number {
  let sum: number = 0; // 记录和
  let temp: number = 1; // 记录暂时的长度
  let len: number = nums.length + 1; // 记录最短的长度，初始赋一个永远取不到的值

  for (let i: number = 0; i < nums.length; i++) {
    sum = 0;
    temp = 0;
    for (let j: number = i; j < nums.length; j++) {
      sum += nums[j];
      temp++;
      if (sum >= s && len > temp) {
        len = temp;
        break;
      }
    }
  }

  // 边界情况，如果和小于目标值时
  if (len === nums.length + 1) {
    return 0;
  }

  return len;
}

// Test
let arr = [2];
let res = minSubArrayLen(7, arr);
console.log(res);
```

```typescript
// 优解
function minSubArrayLen(s: number, nums: number[]): number {
  // 边界情况
  if (nums.length < 1) {
    return 0;
  }

  // 记录最短的长度，初始赋一个永远取不到的值
  let length: number = nums.length + 1;
  // 求和值，初始赋第一个
  let sum: number = nums[0];

  // 定义两个指针，初始指向一前一后
  let leftBound: number = 0;
  let rightBound: number = 1;

  while (leftBound < rightBound && rightBound <= nums.length) {
    if (sum < s) {
      // 边界情况
      // 如果后指针一直到最后，长度值又为nums.length + 1，说明没有找到
      if (rightBound === nums.length) {
        length === nums.length + 1 ? 0 : length;
      }
      sum += nums[rightBound];
      rightBound++; // 后指针右移一位
    } else {
      length = Math.min(length, rightBound - leftBound);
      // 回退左指针的值
      sum -= nums[leftBound];
      leftBound++;
    }
  }

  return length === nums.length + 1 ? 0 : length;
}
// Test
let arr = [2];
let res = minSubArrayLen(7, arr);
console.log(res);
```

## 9. 删除排序数组中的重复项(H)

### 题目

给定一个排序数组，你需要在**[ 原地](http://baike.baidu.com/item/原地算法)** 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组** 并在使用 O(1) 额外空间的条件下完成。

**示例 1:**

```
给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

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

### 思路

- 快慢指针法
- 边界，当数组长度为 1 时，应该直接返回 1。特别注意当数组为空时，应该`nums.length === 0`进行判断，直接返回 0

### 解答

```typescript
// My Solution
function removeDuplicates(nums: number[]): number {
  // 边界条件
  if (nums.length === 1) {
    return nums.length;
  }
  if (nums.length === 0) {
    return 0;
  }

  // 定义快慢指针
  let fast: number = 1;
  let slow: number = 0;

  while (fast !== nums.length) {
    if (nums[fast] === nums[slow]) {
      fast++;
    } else if (nums[fast] !== nums[slow]) {
      nums[slow + 1] = nums[fast];
      slow++;
      fast++;
    }
  }

  // slow+1 是因为nums.length的计算值本来就是以1开始
  nums.length = slow + 1;
  return nums.length;
}

// Test
let arr = <Array<number>>[];
let res = removeDuplicates(arr);
console.log(res);
console.log(arr);
```

```typescript
// 优解
// 也是快慢指针的原理，但是写法更简洁，执行速度快一点
// 避免讨论了边界条件
function removeDuplicates(nums: number[]): number {
  // i为慢指针
  let i: number = 0;
  // j为快指针
  for (let j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      nums[++i] = nums[j];
    }
  }
  return i + 1;
}
```

## 10. 移动零(N)

### 题目

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**示例:**

```
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**说明**:

1. 必须在原数组上操作，不能拷贝额外的数组。
2. 尽量减少操作次数。

### 解法

- 双指针
- 就是将非零的元素往前移动
- 剩下的位置全部置零

### 解答

```typescript
// 优解
function moveZeroes(nums: number[]): void {
  let i: number = 0;
  let j: number = 0;
  for (i = 0, j = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }

  for (let i = j; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// Test
let arr1 = [0, 1, 0, 0, 1];
moveZeroes(arr1);
console.log(arr1);
```

## 11. 两数之和(N)

### 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

**示例:**

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

### 思路

- 此题不同于 T5，T5 是有序，这一题不能先排序再操作，会乱了元素顺序
- 只能用快慢指针法

### 解答

```typescript
// My Solution
function twoSum(nums: number[], target: number): number[] {
  // 考虑边界情况
  if (nums.length <= 1) {
    return [];
  }

  // 定义快慢指针
  let head: number = 0;
  let tail: number = head + 1;

  for (let i: number = 0; i < nums.length; i++) {
    while (tail !== nums.length) {
      if (nums[head] + nums[tail] === target) {
        // 特别注意它返回的答案下标从1开始
        return [head, tail];
      }
      tail++;
    }
    head++;
    tail = head + 1;
  }

  return [];
}

// Test
let arr1 = [3, 2, 4];
let res = twoSum(arr1, 6);
console.log(arr1);
console.log(res);
```

```typescript
// 优解
function twoSum(nums: number[], target: number): number[] {
  // 单次循环，map缓存已遍历过元素的值和下标
  let map = new Map();
  for (let i: number = 0; i < nums.length; i++) {
    // 计算 target 和 当前遍历元素的差值
    // 如果有其他元素等于diff，那么那个元素就是答案
    // 如果没有，则存到map中
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
}
```
