package demos

import (
	"fmt"

	"proglang/internal/logx"
)

// User 结构体：Go 用结构体承载数据，字段首字母大写才是导出的（public）。
type User struct {
	ID    int
	Name  string
	Email string // 小写字段仅包内可见
}

// Account 结构体 + 方法。
type Account struct {
	Owner   string
	balance int // 未导出：外部改不了，只能通过方法
}

// Deposit 用指针接收者，才能改到结构体本身。
func (a *Account) Deposit(amount int) *Account {
	a.balance += amount
	return a // 返回指针支持链式调用
}

// Summary 用值接收者，只读不改。
func (a Account) Summary() string {
	return fmt.Sprintf("%s: ¥%d", a.Owner, a.balance)
}

// Greeter 接口：只列方法签名。Go 的接口是「隐式实现」——
// 任何类型只要有这些方法，就自动满足接口，不用写 implements。
type Greeter interface {
	Greet() string
}

// Greet 让 Account 隐式满足 Greeter。
func (a Account) Greet() string { return "Hi, I'm " + a.Owner }

// VipAccount 组合（嵌入）：把 Account 直接嵌进来，自动获得它的字段和方法。
// Go 没有继承，用「嵌入 + 方法覆盖」代替。
type VipAccount struct {
	Account // 匿名嵌入
	Level   string
}

// Greet 覆盖嵌入类型的同名方法。
func (v VipAccount) Greet() string {
	return v.Account.Greet() + " (VIP " + v.Level + ")"
}

// Structs 演示结构体 / 方法 / 接口 / 组合。
// 要点：
//  1. 结构体是值类型；用指针接收者的方法才能修改它。
//  2. 首字母大写 = 导出（public），小写 = 包内私有。
//  3. 接口是隐式实现的（鸭子类型）：有方法即满足，无需声明。
//  4. 用嵌入（embedding）做组合，替代继承。
func Structs() {
	logx.Title("05 结构体 / 方法 / 接口")

	logx.Note("结构体字面量：可按字段名初始化")
	u := User{ID: 1, Name: "Harry"}
	logx.Show("User{...}", fmt.Sprintf("%+v", u))

	logx.Note("指针接收者方法可链式调用并真正修改状态")
	acc := (&Account{Owner: "Harry"}).Deposit(100).Deposit(50)
	logx.Show("acc.Summary()", acc.Summary())

	logx.Note("隐式接口：Account 没写 implements，却能当 Greeter 用")
	var g Greeter = acc
	logx.Show("g.Greet()", g.Greet())

	logx.Note("组合（嵌入）：VipAccount 复用 Account 的字段和方法")
	vip := VipAccount{Account: Account{Owner: "Alice", balance: 1000}, Level: "Gold"}
	logx.Show("vip.Owner（提升字段）", vip.Owner) // 直接访问嵌入类型的字段
	logx.Show("vip.Summary()（提升方法）", vip.Summary())
	logx.Show("vip.Greet()（覆盖）", vip.Greet())
}
