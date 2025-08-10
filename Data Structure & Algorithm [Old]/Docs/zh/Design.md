# 设计类问题

## 1.打乱数组(H)

### 题目

打乱一个没有重复元素的数组。

**示例:**

```
// 以数字集合 1, 2 和 3 初始化数组。
int[] nums = {1,2,3};
Solution solution = new Solution(nums);

// 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
solution.shuffle();

// 重设数组到它的初始状态[1,2,3]。
solution.reset();

// 随机返回数组[1,2,3]打乱后的结果。
solution.shuffle();
```

### 解法

洗牌算法能保证，对于生成的排列，每一个元素都能等概率的出现在每一个位置。

数组长度为 n， 先从 n 个数据中，随机选取一个元素，与最后一个元素交换

每个元素被选中的概率是 1/n

从剩下长度的 n-1 元素中随便取一个，与倒数第二个元素交换，第一次没有被选中的概率为 n-1/n

第二次被选中的概率为 1/n-1 , 所以概率仍然是 (n-1)/n \* 1/(n-1) = 1/n

所以每一个元素出现在每一个位置的概率，都是 1/n

### 解答

```typescript
// 优解
class Solution {
  public arr: number[] = [];

  constructor(nums: number[]) {
    this.arr = nums;
  }

  reset(): number[] {
    return this.arr;
  }

  shuffle(): number[] {
    let nums = [...this.arr];
    let n = nums.length - 1;
    while (n >= 0) {
      let index = parseInt(String(Math.random() * (n + 1)));
      [nums[index], nums[n]] = [nums[n], nums[index]];
      n--;
    }
    return nums;
  }
}
```
