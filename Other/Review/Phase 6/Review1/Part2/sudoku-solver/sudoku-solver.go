// 37. Sudoku Solver

// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

// Example 1:
// Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
// Explanation: The input board is shown above and the only valid solution is shown below:

package main

import (
	"fmt"
)

func isValid(row int, col int, char byte, board [][]byte) bool {
	// row
	for i := 0; i < 9; i++ {
		if board[row][i] == char {
			return false
		}
	}
	// col
	for i := 0; i < 9; i++ {
		if board[i][col] == char {
			return false
		}
	}
	// square
	startRow := (row / 3) * 3
	startCol := (col / 3) * 3
	for i := startRow; i < startRow+3; i++ {
		for j := startCol; j < startCol+3; j++ {
			if board[i][j] == char {
				return false
			}
		}
	}
	return true
}

func solveSudoku(board [][]byte) {

	var backtrack func(board [][]byte) bool
	backtrack = func(board [][]byte) bool {

		for i := 0; i < len(board); i++ {
			for j := 0; j < len(board[i]); j++ {
				if board[i][j] == '.' {
					for char := '1'; char <= '9'; char++ {
						if isValid(i, j, byte(char), board) == true {
							board[i][j] = byte(char)
							if backtrack(board) == true {
								return true
							}
							board[i][j] = '.'
						}
					}
					return false
				}
			}
		}

		return true
	}

	backtrack(board)
}

// test
func main() {
	board := [][]byte{
		{'5', '3', '.', '.', '7', '.', '.', '.', '.'},
		{'6', '.', '.', '1', '9', '5', '.', '.', '.'},
		{'.', '9', '8', '.', '.', '.', '.', '6', '.'},
		{'8', '.', '.', '.', '6', '.', '.', '.', '3'},
		{'4', '.', '.', '8', '.', '3', '.', '.', '1'},
		{'7', '.', '.', '.', '2', '.', '.', '.', '6'},
		{'.', '6', '.', '.', '.', '.', '2', '8', '.'},
		{'.', '.', '.', '4', '1', '9', '.', '.', '5'},
		{'.', '.', '.', '.', '8', '.', '.', '7', '9'},
	}

	solveSudoku(board)

	for _, row := range board {
		for _, ch := range row {
			fmt.Printf("%c ", ch)
		}
		fmt.Println()
	}
}
