// The Edit distance problem is as follows.

// We are given two strings (not necessarily of equal length). We want to convert the first string to the other by a sequence of insertions, deletions, and substitutions.
// The cost is the number of operations we perform.

// For example, if we want to convert FOOD to MONEY, we could do this:
// FOOD → MOOD → MOND → MONED → MONEY

// One way to visualize this is by alignment:
// F O O D
// M O N E Y

// We define Edit(i, j) to be the minimum cost to convert X[1 . . . i] to Y [1 . . . j].

package main

import "fmt"

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func EditDistance(str1 string, str2 string) int {
	edit := make([][]int, len(str1)+1)
	for index := range edit {
		edit[index] = make([]int, len(str2)+1)
	}

	for i := 0; i <= len(str1); i++ {
		edit[i][0] = i
	}
	for j := 0; j <= len(str2); j++ {
		edit[0][j] = j
	}

	for i := 1; i <= len(str1); i++ {
		for j := 1; j <= len(str2); j++ {
			insertion := edit[i][j-1] + 1
			deletion := edit[i-1][j] + 1
			var substitution int
			if str1[i-1] != str2[j-1] {
				substitution = edit[i-1][j-1] + 1
			} else {
				substitution = edit[i-1][j-1]
			}

			edit[i][j] = min(min(insertion, deletion), substitution)
		}
	}

	return edit[len(str1)][len(str2)]
}

// test
func main() {
	res := EditDistance("FOOD", "MONEY")
	fmt.Println(res)
}
