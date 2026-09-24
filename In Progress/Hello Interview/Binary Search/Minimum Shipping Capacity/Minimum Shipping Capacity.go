package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// You're a logistics manager preparing to ship products from a warehouse. Each product type has both a quantity and a weight per item. Shipping boxes have TWO constraints:

// Capacity limit: Maximum number of items per box
// Weight limit: Maximum weight (kg) per box
// Rules:

// Each product type must be packed separately
// All boxes have the same capacity and weight limits
// A box can hold at most capacity items OR maxWeightPerBox kg, whichever comes first
// Items must be whole numbers (can't pack fractional items)
// Given arrays of quantities and weights per item, plus box and weight constraints, find the minimum box capacity needed to ship all products.

// Example 1:

// Input:

// quantities = [8, 12, 5]
// weights = [2, 3, 1]  # kg per item
// maxBoxes = 6
// maxWeightPerBox = 20  # kg
// Output: 5

// Explanation: With capacity 5:

// Product 0 (8 items @ 2kg): min(5, 10, 8) = 5 items/box → needs 2 boxes (5 + 3 items)
// Product 1 (12 items @ 3kg): min(5, 6, 12) = 5 items/box → needs 3 boxes (5 + 5 + 2 items)
// Product 2 (5 items @ 1kg): min(5, 20, 5) = 5 items/box → needs 1 box Total: 6 boxes ≤ 6 ✓
// Example 2:

// Input:

// quantities = [10, 15, 8]
// weights = [5, 2, 3]
// maxBoxes = 10
// maxWeightPerBox = 15
// Output: 4

// Explanation: With capacity 4:

// Product 0 (10 items @ 5kg): min(4, ⌊15/5⌋, remaining) = 3 items/box → needs 4 boxes
// Product 1 (15 items @ 2kg): min(4, ⌊15/2⌋, remaining) = 4 items/box → needs 4 boxes
// Product 2 (8 items @ 3kg): min(4, ⌊15/3⌋, remaining) = 4 items/box → needs 2 boxes Total: 10 boxes ≤ 10 ✓

func minimumShippingCapacity(quantities []int, weights []int, maxBoxes int, maxWeightPerBox int) int {
	// Your code goes here

	return 0
}

func main() {
	quantities := []int{8, 12, 5}
	weights := []int{2, 3, 1}
	maxBoxes := 6
	maxWeightPerBox := 20

	fmt.Println(minimumShippingCapacity(quantities, weights, maxBoxes, maxWeightPerBox)) // Output: 5

	quantities = []int{10, 15, 8}
	weights = []int{5, 2, 3}
	maxBoxes = 10
	maxWeightPerBox = 15

	fmt.Println(minimumShippingCapacity(quantities, weights, maxBoxes, maxWeightPerBox)) // Output: 4
}
