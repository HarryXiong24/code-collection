package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Given a reference of type ListNode which is the head of a singly linked list, write a function to determine if the linked list is a palindrome.

// # Definition of a ListNode
// class ListNode:
//   def __init__(self, value=0, next=None):
//     self.value = value
//     self.next = next
// A linked list is a palindrome if the values of the nodes are the same when read from left-to-right and right-to-left. An empty list is considered a palindrome.

// Example 1:
// 5
// 4
// 3
// 4
// 5
// head
// Output:
// True
// left-to-right:  5 -> 4 -> 3 -> 4 -> 5
// right-to-left: 5 -> 4 -> 3 -> 4 -> 5

// Example 2:
// 5
// 4
// 3
// head
// Output:
// False
// left-to-right:  5 -> 4 -> 3
// right-to-left: 3 -> 4 -> 5

type ListNode struct {
	Val  int
	Next *ListNode
}

func isPalindrome(head *ListNode) bool {
	// Your code goes here
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}

	var prev *ListNode
	for slow != nil {
		next := slow.Next
		slow.Next = prev
		prev = slow
		slow = next
	}

	for first, second := head, prev; second != nil; first, second = first.Next, second.Next {
		if first.Val != second.Val {
			return false
		}
	}
	return true
}

// test
func main() {
	node1 := &ListNode{Val: 1, Next: nil}
	node2 := &ListNode{Val: 2, Next: nil}
	node3 := &ListNode{Val: 2, Next: nil}
	node4 := &ListNode{Val: 1, Next: nil}

	node1.Next = node2
	node2.Next = node3
	node3.Next = node4

	fmt.Println(isPalindrome(node1))
}
