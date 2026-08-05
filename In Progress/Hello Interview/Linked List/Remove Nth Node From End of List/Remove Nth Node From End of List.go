package main

// DESCRIPTION (inspired by Leetcode.com)
// Given a reference head of type ListNode that is the head node of a singly linked list and an integer n, write a function that removes the n-th node from the end of the list and returns the head of the modified list.

// Note: n is guaranteed to be between 1 and the length of the list. If n is the length of the list, the head of the list should be removed.

// Example 1:
// Input: n = 2
// 5
// 4
// 3
// 2
// 1
// head
// Output:
// 5
// 4
// 3
// 1
// head
// Explanation: The 2nd to last node is removed from the list.

// Example 2:
// Input: n = 5
// 5
// 4
// 3
// 2
// 1
// head
// Output:
// 4
// 3
// 2
// 1
// head
// Explanation: The 5th to last node is the head node, so it is removed.

// Time Complexity: O(n) where n is the number of nodes in the linked list.
// Space Complexity: O(1) since we are using a constant amount of space.
type ListNode struct {
	Val  int
	Next *ListNode
}

func removeNthFromEnd(head *ListNode, n int) *ListNode {
	// Your code goes here
	dummy := &ListNode{-1, head}
	slow := dummy
	fast := dummy

	for i := 0; i < n; i++ {
		if fast.Next == nil {
			return nil
		}
		fast = fast.Next
	}

	for fast.Next != nil {
		fast = fast.Next
		slow = slow.Next
	}

	temp := slow.Next
	slow.Next = temp.Next

	return dummy.Next
}
