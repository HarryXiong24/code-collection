// 17. Letter Combinations of a Phone Number

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// Example 1:
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Example 2:
// Input: digits = ""
// Output: []

// Example 3:
// Input: digits = "2"
// Output: ["a","b","c"]

package main

import (
	"fmt"
	"strings"
)

func letterCombinations(digits string) []string {
	digitToLetters := map[string][]string{
		"2": {"a", "b", "c"},
		"3": {"d", "e", "f"},
		"4": {"g", "h", "i"},
		"5": {"j", "k", "l"},
		"6": {"m", "n", "o"},
		"7": {"p", "q", "r", "s"},
		"8": {"t", "u", "v"},
		"9": {"w", "x", "y", "z"},
	}

	if len(digits) == 0 {
		return []string{}
	}

	results := make([]string, 0)

	var backtrack func(startIndex int, path []string)
	backtrack = func(startIndex int, path []string) {

		if len(path) == len(digits) {
			results = append(results, strings.Join(path, ""))
			return
		}

		current := digitToLetters[string(digits[startIndex])]
		for i := 0; i < len(current); i++ {
			path = append(path, current[i])
			backtrack(startIndex+1, path)
			path = path[:len(path)-1]
		}
	}

	backtrack(0, []string{})

	return results

}

// test
func main() {
	res := letterCombinations("23")
	fmt.Println(res)
}
