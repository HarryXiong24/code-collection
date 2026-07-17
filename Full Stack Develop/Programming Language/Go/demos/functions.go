package demos

import (
	"fmt"
	"strings"

	"proglang/internal/logx"
)

// add 普通函数：参数和返回值都要写类型。
func add(a, b int) int { return a + b } // 同类型参数可合并写 a, b int

// divmod 多返回值：Go 的招牌特性，常用于「结果 + error」。
func divmod(a, b int) (int, int) { return a / b, a % b }

// sum 可变参数：nums 在函数内是 []int。
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// namedReturn 命名返回值 + defer：defer 能在 return 后修改命名返回值。
func namedReturn() (result string) {
	result = "A"
	defer func() { result += "-deferred" }() // 在真正返回前执行
	return result
}

// multiplier 高阶函数：返回一个记住了 factor 的闭包。
func multiplier(factor int) func(int) int {
	return func(n int) int { return n * factor }
}

// Functions 演示函数。
// 要点：
//  1. 支持多返回值，惯例是最后一个返回 error。
//  2. 可变参数 ...T；命名返回值配合 defer 很常见。
//  3. 函数是一等公民：可传参、可作返回值 → 高阶函数与闭包。
//  4. defer 注册的调用按「后进先出」在函数返回前执行，常用于释放资源。
func Functions() {
	logx.Title("03 函数")

	logx.Show("add(2, 3)", add(2, 3))

	logx.Note("多返回值：一次拿到商和余数")
	q, r := divmod(17, 5)
	logx.Show("divmod(17, 5)", fmt.Sprintf("q=%d r=%d", q, r))

	logx.Note("可变参数：像展开一样传任意多个")
	logx.Show("sum(1,2,3,4)", sum(1, 2, 3, 4))
	logx.Show("sum(slice...)", sum([]int{10, 20, 30}...)) // 用 ... 把切片展开

	logx.Note("命名返回值 + defer：defer 在 return 之后仍能改返回值")
	logx.Show("namedReturn()", namedReturn())

	logx.Note("闭包：返回的函数记住了外层的 factor")
	triple := multiplier(3)
	logx.Show("triple(10)", triple(10))

	logx.Note("函数作参数：把行为传进去")
	apply := func(s string, fn func(string) string) string { return fn(s) }
	logx.Show("apply(\"hi\", ToUpper)", apply("hi", strings.ToUpper))

	logx.Note("defer 是后进先出（LIFO）")
	order := []int{}
	func() {
		for i := 1; i <= 3; i++ {
			defer func(n int) { order = append(order, n) }(i)
		}
	}()
	logx.Show("defer 执行顺序", order) // [3 2 1]
}
