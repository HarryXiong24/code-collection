package user

type Admin struct {
	email    string
	password string
	User     *User
}

// Admin 结构体中的 User 字段现在是一个指向 User 结构体的指针类型 (*User)。这意味着 Admin 不再直接嵌套 User 结构体，而是通过指针引用一个 User 实例。这种设计的影响是，Admin 结构体不再自动继承 User 的方法和字段。因此，你需要通过 User 指针显式地访问 User 结构体的方法和字段。
func NewAdmin(email string, password string, user *User) Admin {
	return Admin{
		email:    email,
		password: password,
		User:     user,
	}
}
