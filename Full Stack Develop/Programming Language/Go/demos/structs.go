package demos

import (
	"fmt"

	"proglang/internal/logx"
)

// User struct: Go uses structs to carry data; a field is exported (public) only if it starts with an uppercase letter.
type User struct {
	ID    int
	Name  string
	Email string // a lowercase field is visible only within the package
}

// Account: struct + methods.
type Account struct {
	Owner   string
	balance int // unexported: outsiders can't change it, only through methods
}

// Deposit uses a pointer receiver so it can modify the struct itself.
func (a *Account) Deposit(amount int) *Account {
	a.balance += amount
	return a // returning a pointer supports method chaining
}

// Summary uses a value receiver; read-only, no mutation.
func (a Account) Summary() string {
	return fmt.Sprintf("%s: ¥%d", a.Owner, a.balance)
}

// Greeter interface: lists only method signatures. Go's interfaces are "implicitly implemented" —
// any type that has these methods satisfies the interface automatically, with no implements keyword.
type Greeter interface {
	Greet() string
}

// Greet makes Account implicitly satisfy Greeter.
func (a Account) Greet() string { return "Hi, I'm " + a.Owner }

// VipAccount composition (embedding): embed Account directly to inherit its fields and methods automatically.
// Go has no inheritance; it uses "embedding + method overriding" instead.
type VipAccount struct {
	Account // anonymous embedding
	Level   string
}

// Greet overrides the embedded type's method of the same name.
func (v VipAccount) Greet() string {
	return v.Account.Greet() + " (VIP " + v.Level + ")"
}

// Structs demonstrates structs / methods / interfaces / composition.
// Key points:
//  1. Structs are value types; only methods with pointer receivers can modify them.
//  2. Uppercase initial = exported (public), lowercase = package-private.
//  3. Interfaces are implicitly implemented (duck typing): having the methods satisfies it, no declaration needed.
//  4. Use embedding for composition, replacing inheritance.
func Structs() {
	logx.Title("05 Structs / methods / interfaces")

	logx.Note("struct literals: can be initialized by field name")
	u := User{ID: 1, Name: "Harry"}
	logx.Show("User{...}", fmt.Sprintf("%+v", u))

	logx.Note("pointer-receiver methods support chaining and genuinely modify state")
	acc := (&Account{Owner: "Harry"}).Deposit(100).Deposit(50)
	logx.Show("acc.Summary()", acc.Summary())

	logx.Note("implicit interface: Account never wrote implements, yet works as a Greeter")
	var g Greeter = acc
	logx.Show("g.Greet()", g.Greet())

	logx.Note("composition (embedding): VipAccount reuses Account's fields and methods")
	vip := VipAccount{Account: Account{Owner: "Alice", balance: 1000}, Level: "Gold"}
	logx.Show("vip.Owner (promoted field)", vip.Owner) // directly access the embedded type's field
	logx.Show("vip.Summary() (promoted method)", vip.Summary())
	logx.Show("vip.Greet() (overridden)", vip.Greet())
}
