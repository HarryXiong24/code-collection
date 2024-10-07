// 429. N-ary Tree Level Order Traversal

// Given an n-ary tree, return the level order traversal of its nodes' values.

// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

// Example 1:
// Input: root = [1,null,3,2,4,null,5,6]
// Output: [[1],[3,2,4],[5,6]]

// Example 2:
// Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

package main

// Definition for a binary tree node.
type Node struct {
	Val      int
	Children []*Node
}

func levelOrder(root *Node) [][]int {
	result := make([][]int, 0)
	if root == nil {
		return result
	}

	queue := make([]*Node, 0)
	queue = append(queue, root)

	for len(queue) > 0 {
		size := len(queue)

		temp := make([]int, 0)
		for i := 0; i < size; i++ {
			current := queue[0]
			queue = queue[1:]

			temp = append(temp, current.Val)

			for _, neighbor := range current.Children {
				queue = append(queue, neighbor)
			}

		}
		result = append(result, temp)
	}

	return result
}
