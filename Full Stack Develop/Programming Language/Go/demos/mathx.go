package demos

import "errors"

// Classify is an example function under test, used by the accompanying mathx_test.go.
func Classify(n int) string {
	switch {
	case n < 0:
		return "negative"
	case n == 0:
		return "zero"
	default:
		return "positive"
	}
}

// Divide returns the quotient, returning an error on division by zero (to demonstrate error assertions in tests).
func Divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}
