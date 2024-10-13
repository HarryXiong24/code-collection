package main

import "fmt"

type TreeNode struct {
	EmployeeId            int
	Enjoyment             int
	ImmediateSubordinates []*TreeNode
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxEnjoyment(hierarchy *TreeNode, n int) int {
	// dp[i][0] -> max enjoyment if i is not invited
	// dp[i][1] -> max enjoyment if i is invited

	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, 2)
	}

	var dfs func(node *TreeNode)
	dfs = func(node *TreeNode) {
		dp[node.EmployeeId][1] = node.Enjoyment

		for _, child := range node.ImmediateSubordinates {
			dfs(child)
			// If node is not invited, we can take either inviting or not inviting the child
			dp[node.EmployeeId][0] += max(dp[child.EmployeeId][0], dp[child.EmployeeId][1])
			// If node is invited, we cannot invite the child
			dp[node.EmployeeId][1] += dp[child.EmployeeId][0]
		}
	}

	dfs(hierarchy)

	return max(dp[0][0], dp[0][1])
}

// test
func main() {
	hierarchy := &TreeNode{
		EmployeeId: 0,
		Enjoyment:  5,
		ImmediateSubordinates: []*TreeNode{
			{
				EmployeeId: 1,
				Enjoyment:  3,
				ImmediateSubordinates: []*TreeNode{
					{
						EmployeeId:            3,
						Enjoyment:             2,
						ImmediateSubordinates: []*TreeNode{},
					},
					{
						EmployeeId:            4,
						Enjoyment:             1,
						ImmediateSubordinates: []*TreeNode{},
					},
				},
			},
			{
				EmployeeId: 2,
				Enjoyment:  4,
				ImmediateSubordinates: []*TreeNode{
					{
						EmployeeId:            5,
						Enjoyment:             6,
						ImmediateSubordinates: []*TreeNode{},
					},
					{
						EmployeeId:            6,
						Enjoyment:             7,
						ImmediateSubordinates: []*TreeNode{},
					},
				},
			},
		},
	}

	res := maxEnjoyment(hierarchy, 7)
	fmt.Println(res)
}
