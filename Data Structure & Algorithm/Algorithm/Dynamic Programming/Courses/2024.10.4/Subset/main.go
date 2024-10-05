// Problem Statement: Given a set S of n positive integers, as well as a positive integer T, determine if there is a subset of S that sums to exactly T.

// Example 1: S = {2, 3, 4}, T = 6, the answer is “yes”
// Example 2: S = {2, 3, 5}, T = 6, the answer is “no”

package main

import "fmt"

func subset(s []int, t int) bool {
	sub := make([][]bool, len(s)+1)
	for key := range sub {
		sub[key] = make([]bool, t+1)
	}

	for i := 0; i <= len(s); i++ {
		sub[i][0] = true
	}

	for j := 1; j <= t; j++ {
		sub[0][j] = false
	}

	for i := 1; i <= len(s); i++ {
		for j := 1; j <= t; j++ {
			if j-s[i-1] >= 0 {
				sub[i][j] = sub[i-1][j] || sub[i-1][j-s[i-1]]
			} else {
				sub[i][j] = sub[i-1][j]
			}
		}
	}

	return sub[len(s)][t]
}

func main() {
	res1 := subset([]int{2, 3, 4}, 6)
	res2 := subset([]int{2, 3, 5}, 6)
	fmt.Println(res1)
	fmt.Println(res2)
}
