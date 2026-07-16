# 链表

## 1. 删除链表中的节点(N)

### 题目

请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。

现有一个链表 -- head = [4,5,1,9]，它可以表示为:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/01/19/237_example.png)

**示例 1:**

```
输入: head = [4,5,1,9], node = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
```

**示例 2:**

```
输入: head = [4,5,1,9], node = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
```

**说明:**

- 链表至少包含两个节点。
- 链表中所有节点的值都是唯一的。
- 给定的节点为非末尾节点并且一定是链表中的一个有效节点。
- 不要从你的函数中返回任何结果。

### 思路

- 找到，然后删除节点即可

### 解答

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}
```

## 2. 删除链表的倒数第 N 个节点(H)

### 题目

给定一个链表，删除链表的倒数第 _n_ 个节点，并且返回链表的头结点。

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

**说明：**

给定的 _n_ 保证是有效的。

**进阶：**

你能尝试使用一趟扫描实现吗？

### 思路

- 使用 2 个指针：fast 快指针提前走 n+1 步，slow 指针指向当前距离 fast 倒数第 n 个节点， 初始为 head
- 然后， fast 、 slow 同步向前走，直到 fast.next 为 null
- 此时，fast 为最后一个节点，slow 就是倒数第 n+1 个节点，此时问题就变更为删除链表中的 slow 的后继节点
- 其中，fast 快指针提前走 n 步后，判断 fast.next 是否为 null ，即 fast 是否是最后一个节点
- 如果是，则 head 为倒数第 n 个节点，此时问题可以简化为删除头节点
- 如果不是， fast = fast.next ，fast 再前进一步，slow 为倒数第 n+1 个节点，也解决了以上问题

### 解答

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let fast = head,
    slow = head;
  // 快先走 n 步
  while (--n) {
    fast = fast.next;
  }
  if (!fast.next) return head.next;
  fast = fast.next;
  // fast、slow 一起前进
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};
```

## 3. 单链表

```typescript
// My Solution

export interface INode {
  element: number;
  next: INode | null;
}

class Node implements INode {
  public element: number;
  public next: INode | null = null;

  constructor(element: number, next: INode | null = null) {
    this.element = element;
    this.next = next;
  }
}

class MyLinkedList {
  // 头指针
  public head: INode;
  // 链表长度
  public length: number;

  constructor() {
    this.head = new Node(-1, null);
    // length属性做边界判断
    this.length = 0;
  }

  get(index: number): number {
    // 链表为空
    if (this.head.next === null) {
      return -1;
    }

    let count = 0;
    let temp = this.head.next;

    while (temp.next !== null && count !== index) {
      count++;
      temp = <Node>temp.next;
    }

    return temp.element;
  }

  addAtHead(val: number): void {
    let newNode = new Node(val, null);

    newNode.next = this.head.next;
    this.head.next = newNode;

    this.length++;
  }

  addAtTail(val: number): void {
    let newNode = new Node(val, null);

    let temp = this.head;

    while (temp.next !== null) {
      temp = temp.next;
    }

    temp.next = newNode;
    this.length++;
  }

  addAtIndex(index: number, val: number): void {
    let newNode = new Node(val, null);

    // 大于则不操作
    if (index > this.length) {
      return;
    }

    // 等于则插入尾部
    if ((index = this.length)) {
      this.addAtTail(val);
      return;
    }

    // 小于0则插入头部
    if (index < 0) {
      this.addAtHead(val);
      return;
    }

    let temp = <Node>this.head;
    let count = 0;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    newNode.next = temp.next;
    temp.next = newNode;
    this.length++;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index > this.length - 1) {
      return;
    }

    let temp = this.head;
    let count = 0;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    temp.next = (<Node>temp.next).next;
    this.length--;
  }

  printLinkList(): Array<number> {
    let temp = new Node(-1, null);
    let res: Array<number> = [];

    if (this.head.next === null) {
      return res;
    }

    temp = <Node>this.head.next;

    while (temp !== null) {
      res.push(temp.element);
      temp = <Node>temp.next;
    }

    return res;
  }

  printLength(): number {
    return this.length;
  }
}

// let linkedList = new MyLinkedList();
// linkedList.addAtHead(100);
// linkedList.addAtTail(3);
// linkedList.addAtTail(10);
// linkedList.addAtIndex(3, 2);
// console.log(linkedList.printLinkList());
// console.log(linkedList.get(3));
// linkedList.deleteAtIndex(4);
// console.log(linkedList.printLinkList());
// console.log(linkedList.printLength());

let linkedList = new MyLinkedList();
console.log(linkedList.addAtHead(1));
console.log(linkedList.addAtTail(3));
console.log(linkedList.addAtIndex(1, 2)); //链表变为1-> 2-> 3
console.log(linkedList.get(1)); //返回2
console.log(linkedList.printLinkList());
console.log(linkedList.deleteAtIndex(1)); //现在链表是1-> 3
console.log(linkedList.get(1)); //返回3
console.log(linkedList.printLinkList());
```

## 4. 环形链表(H)

### 题目

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

进阶：

你能用 O(1)（即，常量）内存解决此问题吗？

示例 1：

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

示例 2：

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

示例 3：

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

## 解法

1. 快指针和慢指针，初始都指向头节点
2. 慢指针每次走一步，快指针每次走两步，不断比较它们指向的节点的值
3. 如果节点值相同，说明有环。如果不同，继续循环。
4. 类似“追及问题”，两个人在环形跑道上赛跑，同一个起点出发，一个跑得快一个跑得慢，在某一时刻，跑得快的必定会追上跑得慢的，只要是跑道是环形的，不是环形就肯定追不上。

## 解答

```javascript
var hasCycle = function (head) {
  let fast = head;
  let slow = head;

  while (fast) {
    if (fast.next === null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;

    if (fast === slow) {
      return true;
    }
  }
  return false;
};
```
