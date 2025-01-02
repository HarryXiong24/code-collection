package basic

import (
	"fmt"
	"math"
)

const inflationRate = 2.5
const InflationRate = 2.5

func Calculator() {
	// var investmentAmount = 1000
	// var expectedReturnRate = 5.5
	// var years = 10
	// var futureValue = float64(investmentAmount) * math.Pow(1+expectedReturnRate/100, float64(years))
	// fmt.Println(futureValue)

	// var investmentAmount float64 = 1000
	// years := 10.0
	// expectedReturnRate := 5.5
	// futureValue := investmentAmount * math.Pow(1+expectedReturnRate/100, years)
	// fmt.Println(futureValue)

	// const inflationRate = 6.5
	// var investmentAmount float64 = 1000
	// years := 10.0
	// expectedReturnRate := 5.5

	// futureValue := investmentAmount * math.Pow(1+expectedReturnRate/100, years)
	// futureRealValue := futureValue / math.Pow(1+inflationRate/100, years)

	// fmt.Println("futureValue:", futureValue)
	// fmt.Println("futureRealValue:", futureRealValue)

	var investmentAmount float64
	var years float64
	expectedReturnRate := 5.5

	fmt.Print("Investment Amount: ")
	fmt.Scan(&investmentAmount)

	fmt.Print("Expected Return Rate: ")
	fmt.Scan(&expectedReturnRate)

	fmt.Print("Years: ")
	fmt.Scan(&years)

	// futureValue := investmentAmount * math.Pow(1+expectedReturnRate/100, years)
	// futureRealValue := futureValue / math.Pow(1+inflationRate/100, years)
	futureValue, futureRealValue := calculateFutureValues(investmentAmount, expectedReturnRate, years)

	fmt.Println("futureValue:", futureValue)
	fmt.Println("futureRealValue:", futureRealValue)
	fmt.Printf("Future Value: %.1f\nFuture Value (adjusted for Inflation): %.1f\n", futureValue, futureRealValue)
	// multiple lines print
	// fmt.Printf(`Future Value: %.1f\n
	// Future Value (adjusted for Inflation): %.1f`, futureValue, futureRealValue)

	// fmt.Sprintf("Future Value: %v\n", futureValue) // %v means a var or const
	formattedFV := fmt.Sprintf("Future Value: %.1f\n", futureValue)
	formattedRFV := fmt.Sprintf("Future Value (adjusted for Inflation): %.1f\n", futureRealValue)
	fmt.Print(formattedFV, formattedRFV)
}

func calculateFutureValues(investmentAmount, expectedReturnRate, years float64) (float64, float64) {
	fv := investmentAmount * math.Pow(1+expectedReturnRate/100, years)
	rfv := fv / math.Pow(1+inflationRate/100, years)
	return fv, rfv
}

// func calculateFutureValues(investmentAmount, expectedReturnRate, years float64) (fv float64, rfv float64) {
// 	fv = investmentAmount * math.Pow(1+expectedReturnRate/100, years)
// 	rfv = fv / math.Pow(1+inflationRate/100, years)
// 	return fv, rfv
// 	return
// }
