// 61 旋转链表

/**
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
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

export function rotateRight(head: ListNode | null, k: number): ListNode | null {
  // 没有元素直接返回
  if (head === null) {
    return null;
  }
  let current: ListNode | null = head;
  let len: number = 0;
  let newHead: ListNode | null = null;

  // 获取链表长度
  while (current !== null) {
    current = current.next;
    len++;
  }

  // 保证 k 的值小于等于链表长度
  k = k % len;
  // k 为 0 不旋转，直接返回
  if (k === 0) {
    return head;
  }

  // 还原
  current = head;
  // 把 k 的含义转换成第 k 个数结尾，后面是头
  k = len - k;
  // 遍历至找到的位置的前一个元素
  while (k-- > 1) {
    current = current!.next;
  }

  newHead = current!.next;
  current!.next = null;
  current = newHead;
  while (current && current.next !== null) {
    current = current!.next;
  }
  current!.next = head;

  return newHead;
}
