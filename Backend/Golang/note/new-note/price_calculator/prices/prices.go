package prices

import (
	"fmt"

	"example.com/conversion"
	"example.com/io_manager"
)

type TaxIncludedPriceJob struct {
	IOManager         io_manager.IOManager `json:"-"`
	TaxRate           float64              `json:"tax_rate"`
	InputPrices       []float64            `json:"input_prices"`
	TaxIncludedPrices map[string]string    `json:"tax_included_prices"`
}

func (job *TaxIncludedPriceJob) LoadData() error {
	lines, err := job.IOManager.ReadLines()

	if err != nil {
		fmt.Println(err)
		return err
	}

	prices, err := conversion.StringsToFloats(lines)

	if err != nil {
		fmt.Println(err)
		return err
	}

	job.InputPrices = prices
	return err
}

func (job *TaxIncludedPriceJob) Process() error {
	err := job.LoadData()

	if err != nil {
		return err
	}

	result := make(map[string]string)

	for _, price := range job.InputPrices {
		taxIncludedPrice := price * (1 + job.TaxRate)
		result[fmt.Sprintf("%.2f", price)] = fmt.Sprintf("%.2f", taxIncludedPrice)
	}

	job.TaxIncludedPrices = result

	fmt.Println(result)

	return job.IOManager.WriteResult(job)
}

func NewTaxIncludedPricesJob(fm io_manager.IOManager, textRate float64) *TaxIncludedPriceJob {
	return &TaxIncludedPriceJob{
		IOManager: fm,
		TaxRate:   textRate,
	}
}
