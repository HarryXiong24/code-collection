// A subsequence of a given sequence is just the given sequence with zero or more
// elements left out. Given two sequences X and Y , we say that a sequence Z is a common subsequence of X and Y if Z is a subsequence of both X and Y . Our goal is to find the maximum length common subsequence.

// Examples:
// X        Y        LCS
// complete continue cote
// exercise determine eerie
// surface character race
// toward thousand toad

// As is typical for dynamic programming, let’s determine the general recursive solution first. Can you determine something tautological about the LCS of sequences X and Y ? After that, we will derive the recursive and then iterative solutions to the problem.

package main

import "fmt"

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func LCSRecursion(text1 string, text2 string) int {

	var recursive func(m int, n int) int
	recursive = func(m, n int) int {
		if m < 0 || n < 0 {
			return 0
		}

		if text1[m] == text2[n] {
			return 1 + recursive(m-1, n-1)
		}
		return max(recursive(m-1, n), recursive(m, n-1))
	}

	return recursive(len(text1)-1, len(text2)-1)
}

func LCSDP(text1 string, text2 string) int {

	LCS := make([][]int, len(text1)+1)
	for key := range LCS {
		LCS[key] = make([]int, len(text2)+1)
	}

	// go init by definition
	// for i := 0; i <= len(text1); i++ {
	// 	for j := 0; j <= len(text2); j++ {
	// 		if i == 0 || j == 0 {
	// 			LCS[i][j] = 0
	// 		}
	// 	}
	// }

	for i := 1; i <= len(text1); i++ {
		for j := 1; j <= len(text2); j++ {
			if text1[i-1] == text2[j-1] {
				LCS[i][j] = 1 + LCS[i-1][j-1]
			} else {
				LCS[i][j] = max(LCS[i][j-1], LCS[i-1][j])
			}
		}
	}

	return LCS[len(text1)][len(text2)]
}

func main() {
	res1 := LCSRecursion("complete", "continue")
	res2 := LCSRecursion("exercise", "determine")
	fmt.Println(res1)
	fmt.Println(res2)

	res3 := LCSDP("complete", "continue")
	res4 := LCSDP("exercise", "determine")
	fmt.Println(res3)
	fmt.Println(res4)
}
