// 654. Maximum Binary Tree

// You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm:

// Create a root node whose value is the maximum value in nums.
// Recursively build the left subtree on the subarray prefix to the left of the maximum value.
// Recursively build the right subtree on the subarray suffix to the right of the maximum value.
// Return the maximum binary tree built from nums.

// Example 1:
// Input: nums = [3,2,1,6,0,5]
// Output: [6,3,5,null,2,0,null,null,1]
// Explanation: The recursive calls are as follow:
// - The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].
//     - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].
//         - Empty array, so no child.
//         - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].
//             - Empty array, so no child.
//             - Only one element, so child is a node with value 1.
//     - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].
//         - Only one element, so child is a node with value 0.
//         - Empty array, so no child.

// Example 2:
// Input: nums = [3,2,1]
// Output: [3,null,2,null,1]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func NewTreeNode(val int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{
		Val:   val,
		Left:  left,
		Right: right,
	}
}

func findMax(slice []int) int {

	if len(slice) == 0 {
		return -1
	}

	maxIndex := 0
	for index, val := range slice {
		if val > slice[maxIndex] {
			maxIndex = index
		}
	}

	return maxIndex
}

func constructMaximumBinaryTree(nums []int) *TreeNode {

	if len(nums) == 0 {
		return nil
	}

	maxValue := findMax(nums)
	node := NewTreeNode(nums[maxValue], nil, nil)

	leftSet := nums[0:maxValue]
	rightSet := nums[maxValue+1:]

	node.Left = constructMaximumBinaryTree(leftSet)
	node.Right = constructMaximumBinaryTree(rightSet)

	return node
}
