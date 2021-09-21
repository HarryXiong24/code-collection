// 234 回文链表

/*
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false
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

// 此题转换法，比如将链表的值拷贝到数组用双指针，这在双指针章节有解法展示
// 因为这里采用另一种方法——栈的方式进行判断，用数组模拟栈
export function isPalindrome(head: ListNode | null): boolean {
  if (head === null) {
    return false;
  }
  let current: ListNode | null = head;
  let stack: number[] = [];
  // 压入栈操作
  while (current !== null) {
    stack.push(current.val);
    current = current.next;
  }
  // 还原到初始位置
  current = head;
  let len = Math.floor(stack.length / 2);
  // 注意不能写成 for (let i = 0; i < Math.floor(stack.length / 2); i++)
  // 因为 stack.length 一直在变化
  while (len-- > 0) {
    if (stack.pop() !== current!.val) {
      return false;
    }
    current = current!.next;
  }

  return true;
}
