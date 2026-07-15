// 147. Insertion Sort List

// Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.

// The steps of the insertion sort algorithm:

// Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
// At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.

// It repeats until no input elements remain.

// The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.

// Example 1:
// Input: head = [4,2,1,3]
// Output: [1,2,3,4]

// Example 2:
// Input: head = [-1,5,3,4,0]
// Output: [-1,0,3,4,5]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function insertionSortList(head: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let curr = head;

  while (curr) {
    // At each iteration, we insert an element into the resulting list.
    let prev = dummy;

    // find the position to insert the current node
    while (prev.next && prev.next.val! <= curr.val!) {
      prev = prev.next;
    }

    const next = curr.next;
    // insert the current node to the new list
    curr.next = prev.next;
    prev.next = curr;

    // moving on to the next iteration
    curr = next;
  }

  return dummy.next;
}
