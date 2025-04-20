package main

import (
	"fmt"
)

func KMPSearch(text string, pattern string) int {
	if len(pattern) == 0 {
		return 0
	}

	var findLSP func(pattern string) []int
	findLSP = func(pattern string) []int {
		lsp := make([]int, len(pattern))
		lsp[0] = 0
		j := 0

		for i := 1; i < len(pattern); i++ {
			for j > 0 && pattern[i] != pattern[j] {
				j = lsp[j-1]
			}
			if pattern[i] == pattern[j] {
				j++
			}
			lsp[i] = j
		}

		return lsp
	}

	lsp := findLSP(pattern)
	j := 0

	for i := 0; i < len(text); i++ {
		for j > 0 && text[i] != pattern[j] {
			j = lsp[j-1]
		}
		if text[i] == pattern[j] {
			if j == len(pattern)-1 {
				return i - j
			}
			j++
		}
	}

	return -1
}

// test
func main() {
	res := KMPSearch("AABABABABC", "ABABC")
	fmt.Println(res) // 5
}
