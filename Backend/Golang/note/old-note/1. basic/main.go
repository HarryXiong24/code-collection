package main // 声明main包

// import name

// 导入fmt包，带引字符串时，需要用到它
import (
	"fmt"
)

// 声明main主函数
/*
	func 函数名(参数列表) (返回值列表){
		执行体（业务逻辑）
	}
*/

func main() {
	fmt.Println("Hello World!")
	fmt.Print("Hello World!")
	fmt.Printf("Hello World!\n")
}
