// 2 两数相加

/**
 * 你两个非空的链表，表示两个非负的整数
 * 它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储一位数字
 * 请你将两个数相加，并以相同形式返回一个表示和的链表
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807
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

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let head: ListNode | null = null;
  let tail: ListNode | null = null;
  let carry = 0; // 进位标志
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0; // 有值取值，无值就是 0
    const n2 = l2 ? l2.val : 0; // 有值取值，无值就是 0
    const sum = n1 + n2 + carry; // 算上进位
    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail!.next = new ListNode(sum % 10);
      tail = tail!.next;
    }
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail!.next = new ListNode(carry);
  }
  return head;
}
