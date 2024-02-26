// 383. Ransom Note

// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

// Example 1:
// Input: ransomNote = "a", magazine = "b"
// Output: false

// Example 2:
// Input: ransomNote = "aa", magazine = "ab"
// Output: false

// Example 3:
// Input: ransomNote = "aa", magazine = "aab"
// Output: true

// Using Map
// Time Complexity: O(n)
// Space Complexity: O(n)

package main

import "fmt"

func canConstruct(ransomNote string, magazine string) bool {

	magazineMap := make(map[rune]int)

	for _, char := range magazine {
		magazineMap[char]++
	}

	for _, char := range ransomNote {
		count, ok := magazineMap[char]
		if ok == true && count > 0 {
			magazineMap[char]--
		} else {
			return false
		}
	}

	return true
}

// test
func main() {
	res := canConstruct("aa", "aab")
	fmt.Println(res)
}
