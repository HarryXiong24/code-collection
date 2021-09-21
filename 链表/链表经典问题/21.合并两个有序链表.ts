// 21 合并两个有序链表

/*
 * 将两个升序链表合并为一个新的 升序 链表并返回
 * 新链表是通过拼接给定的两个链表的所有节点组成的
 */

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 这一个答案是复杂版，下面还有一个简化版
export function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const newList = new ListNode(0, null);
  let current: ListNode | null = newList;

  while (l1 !== null || l2 !== null) {
    // list1 还有值，但 list2 遍历完了
    if (l1 !== null && l2 === null) {
      current!.next = l1;
      l1 = l1.next;
      current = current!.next;
    }
    // list1 还有值，但 list1 遍历完了
    if (l2 !== null && l1 === null) {
      current!.next = l2;
      l2 = l2.next;
      current = current!.next;
    }
    // list1，list2 都有值的情况下
    if (l1 !== null && l2 !== null) {
      // 比较大小，决定接入哪一个
      if (l1!.val <= l2!.val) {
        current!.next = l1;
        l1 = l1!.next;
        current = current!.next;
      } else {
        current!.next = l2;
        l2 = l2!.next;
        current = current!.next;
      }
    }
  }

  return newList.next;
}

// 优化版本
export function mergeTwoLists2(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const newList = new ListNode(0, null);
  let current = newList;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  // 这一句就可以达到上面那个大循环和判断的目的
  current.next = l1 ? l1 : l2;

  return newList.next;
}
