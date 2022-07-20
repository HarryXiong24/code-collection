// 206 反转链表

/**
 * 给你单链表的头节点 head，请你反转链表，并返回反转后的链表
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

// 这里使用迭代，递归的方法将会在递归中处理
export function reverseList(head: ListNode | null): ListNode | null {
  let previous: ListNode | null = null;
  let current: ListNode | null = head;

  // 相当于每更改指针指向一次，原链表的这个部分就被切断了，画图易得规律
  while (current !== null) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}
