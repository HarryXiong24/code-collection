package main

import "fmt"

func findLSP(pattern string) []int {
	lsp := make([]int, len(pattern)) // default value is 0, but it still shows the approach of giving initial value
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

func KMPSearch(text string, pattern string) int {
	if len(pattern) == 0 {
		return 0
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
