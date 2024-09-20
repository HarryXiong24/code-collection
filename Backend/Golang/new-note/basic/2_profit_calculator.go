package basic

import (
	"fmt"
)

func ProfitCalculator() {
	// var revenue float64
	// var expenses float64
	// var taxRate float64

	// fmt.Print("Revenue: ")
	// fmt.Scan(&revenue)

	// fmt.Print("Expenses: ")
	// fmt.Scan(&expenses)

	// fmt.Print("Tax Rate: ")
	// fmt.Scan(&taxRate)

	// ebt := revenue - expenses
	// profit := ebt * (1 - taxRate/100)
	// ratio := ebt / profit

	// fmt.Println(ebt)
	// fmt.Println(profit)
	// fmt.Println(ratio)

	revenue := getUserInput("Revenue: ")
	expenses := getUserInput("Expenses: ")
	taxRate := getUserInput("Tax Rate: ")

	ebt, profit, ratio := calculate(revenue, expenses, taxRate)

	fmt.Printf("ebt: %.1f\n", ebt)
	fmt.Printf("profit: %.1f\n", profit)
	fmt.Printf("ratio: %.3f\n", ratio)
}

func calculate(revenue float64, expenses float64, taxRate float64) (float64, float64, float64) {
	ebt := revenue - expenses
	profit := ebt * (1 - taxRate/100)
	ratio := ebt / profit
	return ebt, profit, ratio
}

func getUserInput(infoText string) float64 {
	var userInput float64
	fmt.Print(infoText)
	fmt.Scan(&userInput)
	return userInput
}
