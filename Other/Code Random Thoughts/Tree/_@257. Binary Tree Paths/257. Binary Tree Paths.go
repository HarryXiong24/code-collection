// 257. Binary Tree Paths

// Given the root of a binary tree, return all root-to-leaf paths in any order.

// A leaf is a node with no children.

// Example 1:
// Input: root = [1,2,3,null,5]
// Output: ["1->2->5","1->3"]

// Example 2:
// Input: root = [1]
// Output: ["1"]

package main

import (
	"strconv"
	"strings"
)

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func binaryTreePaths(root *TreeNode) []string {
	res := make([]string, 0)

	if root == nil {
		return res
	}

	var recursion func(node *TreeNode, path []string)
	recursion = func(node *TreeNode, path []string) {

		if node.Left == nil && node.Right == nil {
			path = append(path, strconv.Itoa(node.Val))
			str := strings.Join(path, "->")
			res = append(res, str)
			return
		}

		path = append(path, strconv.Itoa(node.Val))

		if node.Left != nil {
			recursion(node.Left, path)
		}

		if node.Right != nil {
			recursion(node.Right, path)
		}
	}

	recursion(root, []string{})

	return res
}
