// 108. Convert Sorted Array to Binary Search Tree

// Given an integer array nums where the elements are sorted in ascending order, convert it to a
// height-balanced binary search tree.

// Example 1:
// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:

// Example 2:
// Input: nums = [1,3]
// Output: [3,1]
// Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func NewTreeNode(val int) *TreeNode {
	return &TreeNode{
		Val:   val,
		Left:  nil,
		Right: nil,
	}
}

func sortedArrayToBST(nums []int) *TreeNode {

	var recursion func(nums []int) *TreeNode
	recursion = func(nums []int) *TreeNode {
		if len(nums) == 0 {
			return nil
		}

		midIndex := len(nums) / 2
		node := NewTreeNode(nums[midIndex])

		node.Left = recursion(nums[0:midIndex])
		node.Right = recursion(nums[midIndex+1:])

		return node
	}

	return recursion(nums)

}
