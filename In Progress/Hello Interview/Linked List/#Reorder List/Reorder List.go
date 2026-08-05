package main

import (
	"fmt"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given a reference head of type ListNode that is the head of a singly linked list, reorder the list in-place such that the nodes are reordered to form the following pattern:

// 1st node -> last node -> 2nd node -> 2nd to last node -> 3rd node ...

// Example 1: input:
// 5
// 4
// 3
// 2
// 1
// head
// output:
// 5
// 1
// 4
// 2
// 3
// head

// Example 2: input:
// 0
// 1
// 2
// head
// output:
// 0
// 2
// 1

type ListNode struct {
	Val  int
	Next *ListNode
}

func reorderList(head *ListNode) {
	// Your code goes here
	if head == nil || head.Next == nil {
		return
	}

	slow := head
	fast := head

	for fast.Next != nil && fast.Next.Next != nil {
		fast = fast.Next.Next
		slow = slow.Next
	}

	half := slow.Next
	slow.Next = nil

	var prev *ListNode
	cur := half

	for cur != nil {
		next := cur.Next
		cur.Next = prev
		prev = cur
		cur = next
	}

	first_half := head
	sec_half := prev

	for sec_half != nil {
		tempFirst := first_half.Next
		tempSecond := sec_half.Next
		first_half.Next = sec_half
		sec_half.Next = tempFirst
		first_half = tempFirst
		sec_half = tempSecond
	}
}

func reorderList2(head *ListNode) {
	// Your code goes here
	start := head
	last := start
	var prev *ListNode

	for start.Next != nil {
		for last.Next != nil {
			prev = last
			last = last.Next
		}

		temp := start.Next
		start.Next = last
		last.Next = temp
		prev.Next = nil

		start = temp
		last = start
	}
}

// test
func main() {
	node0 := &ListNode{Val: 5, Next: nil}
	node1 := &ListNode{Val: 4, Next: nil}
	node2 := &ListNode{Val: 3, Next: nil}
	node3 := &ListNode{Val: 2, Next: nil}
	node4 := &ListNode{Val: 1, Next: nil}

	node0.Next = node1
	node1.Next = node2
	node2.Next = node3
	node3.Next = node4

	reorderList(node0)

	start := node0
	for start != nil {
		fmt.Println(start.Val)
		start = start.Next
	}
}
