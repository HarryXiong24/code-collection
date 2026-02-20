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

// Copy into Array List and then Use Two Pointer Technique
export function isPalindrome(head: ListNode | null): boolean {
  const arr: number[] = [];
  let current = head;
  while (current !== null) {
    arr.push(current.val);
    current = current.next;
  }

  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Push each element into stack and use stack‘s characteristic
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

// recursion
export function isPalindrome2(head: ListNode | null): boolean {
  if (head === null) {
    return true;
  }

  let frontPointer: ListNode | null = head;

  const recursivelyCheck = (currentNode: ListNode | null) => {
    if (currentNode !== null) {
      if (!recursivelyCheck(currentNode.next)) {
        return false;
      }
      if (currentNode.val !== frontPointer!.val) {
        return false;
      }
      frontPointer = frontPointer!.next;
    }
    return true;
  };

  return recursivelyCheck(head);
}
