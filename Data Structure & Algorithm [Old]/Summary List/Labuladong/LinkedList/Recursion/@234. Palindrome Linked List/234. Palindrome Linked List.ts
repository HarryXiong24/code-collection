// 234. Palindrome Linked List

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

// Example 1:
// Input: head = [1,2,2,1]
// Output: true

// Example 2:
// Input: head = [1,2]
// Output: false

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function isPalindrome(head: ListNode | null): boolean {
  if (!head) {
    return true;
  }

  let left: ListNode | null = head;

  let isPalindrome = true;

  const recursive = (right: ListNode | null) => {
    if (!right) {
      return;
    }

    recursive(right.next);

    if (left!.val !== right.val) {
      isPalindrome = false;
    }
    left = left!.next;
  };

  recursive(head);

  return isPalindrome;
}
