package main

// DESCRIPTION (inspired by Leetcode.com)
// Given a reference head of type ListNode that is the head of a singly linked list, write a function to swap every two adjacent nodes and return its head.

// You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// Example 1: input:
// 5
// 4
// 3
// 2
// 1
// head
// output:
// 4
// 5
// 2
// 3
// 1
// head
// Explanation: 5 and 4 are swapped, 3 and 2 are swapped, and 1 is left alone.

// Example 2: input:

// 1
// 2
// 3
// 4
// head
// output:
// 2
// 1
// 4
// 3
// head
// Explanation: 1 and 2 are swapped, 3 and 4 are swapped.

type ListNode struct {
	Val  int
	Next *ListNode
}

func swapPairs(head *ListNode) *ListNode {
	// Your code goes here
	var dummy *ListNode = &ListNode{Val: -1, Next: head}
	var next *ListNode
	var prev *ListNode = dummy
	first := head

	for first != nil && first.Next != nil {
		second := first.Next
		next = second.Next

		prev.Next = second
		second.Next = first
		first.Next = next

		prev = first
		first = next
	}

	return dummy.Next
}
