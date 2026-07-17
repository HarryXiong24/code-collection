// Package shapes 演示「包」是 Go 的封装单元。
// 规则很简单：标识符首字母大写 = 导出（包外可见），小写 = 包内私有。
// 这是被 demos/modules.go 导入的示例包。
package shapes

// Pi 导出常量（大写开头）。
const Pi = 3.14159

// loaded 是未导出的包级变量，只有本包能读写。
var loaded []string

// init 在包被首次导入时自动执行（可有多个，先于 main 运行）。
func init() {
	loaded = append(loaded, "shapes.init 已运行")
}

// CircleArea 导出函数，内部用到未导出的 square。
func CircleArea(r float64) float64 {
	return Pi * square(r)
}

// square 未导出：包外无法调用 shapes.square。
func square(x float64) float64 {
	return x * x
}

// Loaded 通过导出函数，把未导出的状态暴露出去（封装的惯用法）。
func Loaded() []string {
	return loaded
}
