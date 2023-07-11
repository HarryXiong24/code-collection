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

// Recursion
// Time complexity: O(n)
// Space complexity: O(n)
export function isPalindrome(head: ListNode | null): boolean {
  let res = true;
  let front: ListNode | null = head;

  if (!front) {
    return true;
  }

  const recursive = (node: ListNode | null) => {
    if (!node || !front) {
      return;
    }
    recursive(node.next);
    if (node.val !== front?.val) {
      res = false;
    }
    front = front?.next;
  };

  recursive(head);
  return res;
}

// Push each element into stack and use stack‘s characteristic
// Time complexity: O(n)
// Space complexity: O(n)
export function isPalindrome1(head: ListNode | null): boolean {
  const stack: number[] = [];
  let current = head;
  while (current !== null) {
    stack.push(current.val);
    current = current.next;
  }

  // only need to compare half of elements
  let length = Math.floor(stack.length / 2);
  current = head;

  // pop a stack element and compare it with the current linked node
  while (length > 0 && current !== null) {
    if (stack.pop() !== current?.val) {
      return false;
    }
    length--;
    current = current?.next;
  }

  return true;
}

// Reverse Second Half In-place, better method
// Time complexity: O(n)
// Space complexity: O(1)
export function isPalindrome2(head: ListNode | null): boolean {
  let length: number = 0;
  let node = head;

  // find out the length
  while (node) {
    length++;
    node = node.next;
  }

  // find out the head of the second half linked list
  let mid = length % 2 === 0 ? Math.floor(length / 2) : Math.floor(length / 2) + 1;
  let second_half_head = head;
  while (mid > 0) {
    second_half_head = second_half_head!.next;
    mid--;
  }

  // reverse the second half linked list
  let pre: ListNode | null = null;
  while (second_half_head) {
    const next = second_half_head.next;
    second_half_head.next = pre;
    pre = second_half_head;
    second_half_head = next;
  }

  // compare the first half and second half
  mid = Math.floor(length / 2);
  node = head;
  while (mid > 0) {
    console.log(node?.val, pre?.val);
    if (node?.val !== pre?.val) {
      return false;
    }
    node = node!.next!;
    pre = pre!.next!;
    mid--;
  }

  return true;
}
