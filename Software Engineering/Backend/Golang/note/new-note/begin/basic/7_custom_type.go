package basic

import "fmt"

type str string

func (text str) log() {
	fmt.Println(text)
}

func CustomTypeDemo() {
	var name str = "Max"

	name.log()
}
