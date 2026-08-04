package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Write a function that takes in a parameter head of type ListNode that is a reference to the head of a linked list. The function should return True if the linked list contains a cycle, and False otherwise, without modifying the linked list in any way.

// # Definition of a ListNode
// class ListNode:
//   def __init__(self, value=0, next=None):
//     self.value = value
//     self.next = next
// Example 1:
// 5
// 4
// 3
// 2
// 0
// head
// Output: true, there is a cycle between node 0 and node 3.

// Example 2:
// 5
// 4
// 3
// 2
// 0
// head
// Output: false, there is no cycle in the linked list.

// Time complexity: O(n)
// Space complexity: O(1)
type ListNode struct {
	Val  int
	Next *ListNode
}

func hasCycle(head *ListNode) bool {
	// Your code goes here
	if head == nil {
		return false
	}
	slow := head
	fast := head.Next

	for fast != nil && fast.Next != nil {
		if slow == fast {
			return true
		}
		slow = slow.Next
		fast = fast.Next.Next
	}

	return false
}

// test
func main() {
	// Example 1: Create a linked list with a cycle
	// 5 -> 4 -> 3 -> 2 -> 0
	node0 := &ListNode{Val: 5, Next: nil}
	node1 := &ListNode{Val: 4, Next: nil}
	node2 := &ListNode{Val: 3, Next: nil}
	node3 := &ListNode{Val: 2, Next: nil}
	node4 := &ListNode{Val: 0, Next: nil}

	node0.Next = node1
	node1.Next = node2
	node2.Next = node3
	node3.Next = node4
	node4.Next = node2 // Create a cycle here

	fmt.Println(hasCycle(node0))
}
