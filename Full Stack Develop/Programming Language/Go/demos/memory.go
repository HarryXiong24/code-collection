package demos

import (
	"fmt"

	"proglang/internal/logx"
)

type counter struct{ n int }

// byValue 收值的副本：改不到调用方。
func byValue(c counter) { c.n = 999 }

// byPointer 收指针：能改到调用方的原对象。
func byPointer(c *counter) { c.n = 999 }

// Memory 演示指针与值语义。
// 要点：
//  1. Go 有真正的指针 *T 和取地址 &，但没有指针算术（比 C 安全）。
//  2. 函数传参一律「传值」——传结构体是拷贝，传指针是拷贝指针（仍指向同一对象）。
//  3. 想在函数里修改对象，就传 *T；只读大结构体传指针也能省拷贝。
//  4. new(T) 返回 *T（零值）；make 用于 slice/map/channel 的初始化。
//  5. 局部变量取地址返回也安全：逃逸分析会自动把它分配到堆上。
func Memory() {
	logx.Title("11 指针与值语义")

	logx.Note("传值：函数拿到的是副本，改不到外面")
	c := counter{n: 1}
	byValue(c)
	logx.Show("byValue 后 c.n", c.n) // 还是 1

	logx.Note("传指针：拿到地址，能改到原对象")
	byPointer(&c)
	logx.Show("byPointer 后 c.n", c.n) // 变 999

	logx.Note("& 取地址，* 解引用")
	x := 42
	p := &x
	*p = 100
	logx.Show("*p 改后 x", x)
	logx.Show("p 是地址", fmt.Sprintf("%p 指向 %d", p, *p))

	logx.Note("new 返回零值的指针；nil 指针解引用会 panic（要先判空）")
	np := new(counter) // *counter，指向零值
	logx.Show("new(counter).n", np.n)

	logx.Note("切片/map 是引用类型：拷贝变量仍共享底层数据")
	a := []int{1, 2, 3}
	b := a // 拷贝的是切片头，底层数组共享
	b[0] = 99
	logx.Show("改 b[0] 影响 a", a[0])

	logx.Note("返回局部变量的地址是安全的（逃逸分析搬到堆上）")
	makeCounter := func() *counter { c := counter{n: 7}; return &c }
	logx.Show("返回局部地址", makeCounter().n)
}
