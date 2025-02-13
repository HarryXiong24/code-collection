// 344. Reverse String

// Write a function that reverses a string. The input string is given as an array of characters s.

// You must do this by modifying the input array in-place with O(1) extra memory.

// Example 1:
// Input: s = ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]

// Example 2:
// Input: s = ["H","a","n","n","a","h"]
// Output: ["h","a","n","n","a","H"]

package main

import "fmt"

func reverseString(s []byte) {

	left := 0
	right := len(s) - 1

	for left < right {
		temp := s[left]
		s[left] = s[right]
		s[right] = temp
		left++
		right--
	}
}

// test
func main() {
	str := []byte("hello")
	reverseString(str)
	fmt.Println(str)
}
