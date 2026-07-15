package main

import (
	"fmt"

	"example.com/file_manager"
	"example.com/prices"
)

func main() {
	taxRates := []float64{0, 0.07, 0.1, 0.15}

	for _, taxRate := range taxRates {
		fm := file_manager.New("prices.txt", fmt.Sprintf("result_%.0f.json", taxRate*100))
		// cmdm := cmd_manager.New()
		pricesJob := prices.NewTaxIncludedPricesJob(fm, taxRate)
		err := pricesJob.Process()

		if err != nil {
			fmt.Println(err)
		}
	}
}
