package demos

import (
	"proglang/internal/logx"
	"proglang/internal/shapes" // 导入路径 = 模块名/目录，包名是最后一段
)

// Modules 演示包 / 导入 / 可见性。
// 要点：
//  1. Go 的封装单元是「包」（package），不是文件；同一包可拆成多个文件。
//  2. 导出规则只看首字母大小写：大写导出，小写包内私有 —— 没有 public/private 关键字。
//  3. 导入用完整路径 module/dir，引用时用包名前缀：shapes.CircleArea。
//  4. init() 在包被导入时自动运行，先于 main，用于一次性初始化。
//  5. internal/ 目录是特殊约定：只能被其父目录子树内的代码导入。
func Modules() {
	logx.Title("14 包 / 导入 / 可见性")

	logx.Note("调用导出函数：首字母大写的才能跨包访问")
	logx.Show("shapes.CircleArea(2)", shapes.CircleArea(2))
	logx.Show("shapes.Pi（导出常量）", shapes.Pi)

	logx.Note("shapes.square 未导出（小写），这里根本写不出来 —— 编译期就挡住")

	logx.Note("init() 在包导入时自动跑过了，状态通过导出函数暴露")
	logx.Show("shapes.Loaded()", shapes.Loaded())

	logx.Note("internal/ 目录：只有 proglang 子树内的代码能导入，是强制的封装边界")
}
