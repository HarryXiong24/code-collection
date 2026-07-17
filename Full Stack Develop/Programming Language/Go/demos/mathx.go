package demos

import "errors"

// Classify 是被测函数示例，用于配套的 mathx_test.go。
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

// Divide 返回商，除零时返回 error（配合测试演示错误断言）。
func Divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}
