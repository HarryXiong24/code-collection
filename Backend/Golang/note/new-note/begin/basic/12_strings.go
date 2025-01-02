package basic

import (
	"fmt"
	"strings"
)

func StringDemo() {
	s := "abcde"
	fmt.Println(strings.Split(s, ""))
	fmt.Println(strings.Contains(s, "ab"))
	fmt.Println(strings.Join(strings.Split(s, ""), ""))
}
