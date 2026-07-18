package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Given an array of integers representing card values, write a function to calculate the maximum score you can achieve by picking exactly k cards.

// You must pick cards in order from either end. You can take some cards from the beginning, then switch to taking cards from the end, but you cannot skip cards or pick from the middle.

// For example, with k = 3:

// Take the first 3 cards: valid
// Take the last 3 cards: valid
// Take the first card, then the last 2 cards: valid
// Take the first 2 cards, then the last card: valid
// Take card at index 0, skip some, then take card at index 5: not valid (skipping cards)
// Constraints: 1 <= k <= cards.length

// Example 1:
// Input:
// cards = [2,11,4,5,3,9,2]
// k = 3
// Output:
// 17
// Explanation:
// First 3 cards: 2 + 11 + 4 = 17
// Last 3 cards: 3 + 9 + 2 = 14
// First 1 + last 2: 2 + 9 + 2 = 13
// First 2 + last 1: 2 + 11 + 2 = 15
// Maximum score is 17.

// Example 2:
// Input:
// cards = [1, 100, 10, 0, 4, 5, 6]
// k = 3
// Output:
// 111
// Explanation: Take the first three cards: 1 + 100 + 10 = 111. This is better than taking the last 3 cards (4 + 5 + 6 = 15) or any other combination.

// Time Complexity: O(n)
// Space Complexity: O(1)
func maxScore(cards []int, k int) int {
	maxScore := 0

	// this question looks hard to use slide window
	// but it is just a simple slide window
	// just see it as a loop

	// the sum of initial window, all in the left
	for i := 0; i < k; i++ {
		maxScore += cards[i]
	}

	windowSum := maxScore
	for i := k - 1; i >= 0; i-- {
		windowSum = windowSum - cards[i] + cards[len(cards)-k+i] // the new card is the card at the end of the window, and find this len(cards)-k+i is the key to get the index of the new card
		if windowSum > maxScore {
			maxScore = windowSum
		}
	}

	return maxScore
}

// the above solution is not the best solution, but it is a good example of sliding window
// the best solution is to consider n-k as the window size, and then Sum of picked cards = Total sum - Sum of unpicked cards

// Time Complexity: O(n)
// Space Complexity: O(1)
func maxScore2(cards []int, k int) int {
	maxScore := 0

	totalSum := 0
	for i := 0; i < len(cards); i++ {
		totalSum += cards[i]
	}

	windowSum := 0
	for i := 0; i < len(cards)-k; i++ {
		windowSum += cards[i]
	}

	maxScore = totalSum - windowSum
	for i := len(cards) - k; i < len(cards); i++ {
		windowSum = windowSum - cards[i-(len(cards)-k)] + cards[i]
		if totalSum-windowSum > maxScore {
			maxScore = totalSum - windowSum
		}
	}

	return maxScore
}

// test
func main() {
	nums := []int{2, 11, 4, 5, 3, 9, 2}
	k := 3
	fmt.Println(maxScore(nums, k))
	fmt.Println(maxScore2(nums, k))
}
