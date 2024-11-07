// 51. N-Queens

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

// Example 1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

// Example 2:
// Input: n = 1
// Output: [["Q"]]

package main

import (
	"fmt"
	"strings"
)

func isValid(row int, col int, chessboard [][]string, n int) bool {

	// col
	for i := 0; i < row; i++ {
		if chessboard[i][col] == "Q" {
			return false
		}
	}

	// 45 degree
	for i, j := row-1, col-1; i >= 0 && j >= 0; i, j = i-1, j-1 {
		if chessboard[i][j] == "Q" {
			return false
		}
	}

	// 135 degree
	for i, j := row-1, col+1; i >= 0 && j < n; i, j = i-1, j+1 {
		if chessboard[i][j] == "Q" {
			return false
		}
	}

	return true
}

func solveNQueens(n int) [][]string {
	results := make([][]string, 0)

	var backtrack func(chessboard [][]string, row int)
	backtrack = func(chessboard [][]string, row int) {

		if row == n {
			temp := make([]string, 0)
			for _, value := range chessboard {
				temp = append(temp, strings.Join(value, ""))
			}
			results = append(results, temp)
			return
		}

		for i := 0; i < n; i++ {
			if isValid(row, i, chessboard, n) == false {
				continue
			}

			chessboard[row][i] = "Q"
			backtrack(chessboard, row+1)
			chessboard[row][i] = "."
		}

	}

	chessboard := make([][]string, n)
	for i := 0; i < n; i++ {
		chessboard[i] = make([]string, n)
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			chessboard[i][j] = "."
		}
	}

	backtrack(chessboard, 0)

	return results
}

// test
func main() {
	res := solveNQueens(4)
	fmt.Println(res)
}
