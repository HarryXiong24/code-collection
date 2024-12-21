package main

import "fmt"

type Foo struct {
	bar string
}

func main() {
	s1 := []Foo{
		{"A"},
		{"B"},
		{"C"},
	}

	s2 := make([]*Foo, len(s1))

	for i, value := range s1 {
		s2[i] = &value
	}

	fmt.Println(s1[0], s1[1], s1[2])
	fmt.Println(s2[0], s2[1], s2[2])
}

// {A} {B} {C}
// &{A} &{B} &{C}
