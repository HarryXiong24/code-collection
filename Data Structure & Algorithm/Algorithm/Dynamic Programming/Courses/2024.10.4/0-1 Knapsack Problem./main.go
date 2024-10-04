// Suppose a hiker is about to go on a trek through a rainforest carrying a single knapsack.
// She knows the maximum total weight W she can carry and has a set S of n potentially useful items to take with her, such as a folding chair, a tent, or a copy of the CompSci 260P textbook.
// Each item i has a weight wi (a positive integer) and a benefit value bi (positive, not necessarily integer).
// The goal is to select a subset of the items such that the total weight is at most W while maximizing the total benefit of the items. This is known as the 0-1 Knapsack
// Problem.

package main

import "fmt"

type Item struct {
	weight int
	value  int
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxValue(maxWeight int, knapsack []Item) int {

	valueList := make([][]int, len(knapsack))
	for key := range valueList {
		valueList[key] = make([]int, maxWeight+1)
	}

	// init
	for i := 1; i <= maxWeight; i++ {
		valueList[0][i] = knapsack[0].value
	}

	for i := 1; i < len(knapsack); i++ {
		for j := 1; j <= maxWeight; j++ {
			if j >= knapsack[i].weight {
				valueList[i][j] = max(valueList[i-1][j], valueList[i-1][j-knapsack[i].weight]+knapsack[i].value)
			} else {
				valueList[i][j] = valueList[i-1][j]
			}
		}
	}

	return valueList[len(knapsack)-1][maxWeight]
}

func main() {
	maxWeight := 4
	knapsack := []Item{
		{
			weight: 1,
			value:  15,
		},
		{
			weight: 3,
			value:  20,
		},
		{
			weight: 4,
			value:  30,
		},
	}

	res := maxValue(maxWeight, knapsack)
	fmt.Println(res)
}
