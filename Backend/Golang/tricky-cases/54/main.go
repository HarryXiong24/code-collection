package main

type T struct{}

func (*T) foo() {
}

func (T) bar() {
}

type S struct {
	*T
}

func main() {
	s := S{}
	_ = s.foo
	s.foo()
	_ = s.bar // s.bar 将被展开为 (*s.T).bar，而 s.T 是个空指针，解引用会 panic。
}
