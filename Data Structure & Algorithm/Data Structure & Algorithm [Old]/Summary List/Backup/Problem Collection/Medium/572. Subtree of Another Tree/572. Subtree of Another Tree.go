// 572. Subtree of Another Tree

// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

// Example 1:
// Input: root = [3,4,5,1,2], subRoot = [4,1,2]
// Output: true

// Example 2:
// Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
// Output: false

package main

import (
	"fmt"
	"reflect"
	"strconv"
)

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func isSameTree(node *TreeNode, sub_node *TreeNode) bool {
	if node == nil && sub_node == nil {
		return true
	} else if node == nil && sub_node != nil {
		return false
	} else if node != nil && sub_node == nil {
		return false
	} else {
		if node.Val == sub_node.Val {
			return isSameTree(node.Left, sub_node.Left) && isSameTree(node.Right, sub_node.Right)
		} else {
			return false
		}
	}
}

// Recursive
func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
	var recursive func(node *TreeNode, sub_node *TreeNode) bool
	recursive = func(node *TreeNode, sub_node *TreeNode) bool {
		if node == nil && sub_node == nil {
			return true
		} else if node == nil && sub_node != nil {
			return false
		} else if node != nil && sub_node == nil {
			return false
		} else {
			if isSameTree(node, sub_node) {
				return true
			} else {
				return recursive(node.Left, subRoot) || recursive(node.Right, subRoot)
			}
		}
	}

	return recursive(root, subRoot)
}

// String Match
func printTree(node *TreeNode, log *[]string) {
	if node == nil {
		*log = append(*log, "#")
		return
	}
	*log = append(*log, ","+strconv.Itoa(node.Val)+",")
	printTree(node.Left, log)
	printTree(node.Right, log)
}

func isSubtree1(root *TreeNode, subRoot *TreeNode) bool {
	root_log := []string{}
	sub_root_log := []string{}

	printTree(root, &root_log)
	printTree(subRoot, &sub_root_log)

	fmt.Println(root_log, sub_root_log)

	n := len(sub_root_log)
	for i := 0; i < len(root_log)-n+1; i++ {
		if reflect.DeepEqual(root_log[i:i+n], sub_root_log) == true {
			return true
		}
	}
	return false
}
