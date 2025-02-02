// 93. Restore IP Addresses

// A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

// For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.

// Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

// Example 1:
// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]

// Example 2:
// Input: s = "0000"
// Output: ["0.0.0.0"]

// Example 3:
// Input: s = "101023"
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

package main

import (
	"fmt"
	"strconv"
	"strings"
)

func checkValidity(s string) bool {

	if len(s) > 1 && s[0] == '0' {
		return false
	}

	num, err := strconv.Atoi(s)
	if err != nil {
		return false
	}

	if num >= 0 && num <= 255 {
		return true
	}

	return false
}

func restoreIpAddresses(s string) []string {

	results := make([]string, 0)

	if len(s) == 0 {
		return results
	}

	var backtrack func(startIndex int, path []string)
	backtrack = func(startIndex int, path []string) {

		if startIndex == len(s) && len(path) == 4 {
			results = append(results, strings.Join(path, "."))
			return
		}

		for i := startIndex; i < len(s); i++ {
			temp := s[startIndex : i+1]

			if checkValidity(temp) == false {
				continue
			}

			path = append(path, temp)
			backtrack(i+1, path)
			path = path[:len(path)-1]
		}

	}

	backtrack(0, []string{})

	return results
}

// test
func main() {
	res := restoreIpAddresses("25525511135")
	fmt.Println(res)
}
