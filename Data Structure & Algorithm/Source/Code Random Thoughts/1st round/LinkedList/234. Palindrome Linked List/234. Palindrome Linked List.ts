// 234. Palindrome Linked List

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

// Example 1:
// Input: head = [1,2,2,1]
// Output: true

// Example 2:
// Input: head = [1,2]
// Output: false

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function isPalindrome(head: ListNode | null): boolean {
  let length: number = 0;
  let node = head;

  while (node) {
    length++;
    node = node.next;
  }

  let count = length % 2 === 0 ? Math.floor(length / 2) : Math.floor(length / 2) + 1;
  let second_half_head = head;
  while (count > 0) {
    second_half_head = second_half_head!.next;
    count--;
  }

  let pre: ListNode | null = null;
  while (second_half_head) {
    const next = second_half_head.next;
    second_half_head.next = pre;
    pre = second_half_head;
    second_half_head = next;
  }

  count = Math.floor(length / 2);
  node = head;
  while (count > 0) {
    console.log(node?.val, pre?.val);
    if (node?.val !== pre?.val) {
      return false;
    }
    node = node!.next!;
    pre = pre!.next!;
    count--;
  }

  return true;
}
