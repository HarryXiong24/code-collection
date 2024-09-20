package main

import (
	"fmt"
	"reflect"
)

type Author struct {
	name string
	wx   string
}

// 命名结构体
type Lesson struct {
	name   string // 课程名称
	target string // 学习目标
	spend  int    // 学习时间
}

func (lesson Lesson) ShowLessonInfo() {
	fmt.Println("name", lesson.name)
	fmt.Println("target", lesson.target)
}

func (lesson *Lesson) AddTime(n int) {
	lesson.spend = lesson.spend + n
}

type Lesson2 struct {
	name, target string
	spend        int
}

type Lesson4 struct {
	string
	int
}

type Lesson5 struct {
	name, target string
	spend        int
	author       Author
}

type Lesson6 struct {
	name, target string
	spend        int
	Author
}

func main() {
	// 创建结构体时，使用字段名称对每个字段进行初始化。
	lesson1 := Lesson{
		name:   "Harry",
		target: "target",
		spend:  15,
	}
	// 不适用字段名称，直接按字段声明的顺序对字段初始化。
	lesson2 := Lesson{"Harry", "target", 15}
	fmt.Println(lesson1)
	fmt.Println(lesson2)

	// 匿名结构体
	lesson3 := struct {
		name   string
		target string
		spend  int
	}{
		name:   "Harry",
		target: "target",
		spend:  15,
	}
	fmt.Println(lesson3)
	fmt.Println("---------------------")

	// 结构体的零值
	var lesson4 = Lesson{}
	fmt.Println("lesson4:", lesson4)
	fmt.Println("---------------------")

	var lesson5 = Lesson{
		name:   "Harry",
		target: "target",
	}
	fmt.Println(lesson5)
	fmt.Println("---------------------")

	var lesson6 = Lesson{
		name:   "Harry",
		target: "target",
		spend:  49,
	}
	fmt.Println("lesson6 name", lesson6.name)
	fmt.Println("lesson6 target", lesson6.target)
	fmt.Println("lesson6 spend", lesson6.spend)
	fmt.Println("---------------------")

	var lesson7 = Lesson{}
	lesson7.name = "Harry"
	lesson7.target = "target"
	lesson7.spend = 49
	fmt.Println("lesson7 ", lesson7)
	fmt.Println("---------------------")

	// lesson8->name(C语言形式)，Go语言，统一用.的形式访问字段
	lesson8 := &Lesson{
		name:   "Harry",
		target: "target",
		spend:  49,
	}

	fmt.Println("lesson8 name", (*lesson8).name)
	fmt.Println("lesson8 name", lesson8.name)
	fmt.Println("---------------------")

	lesson9 := Lesson4{"target", 49}
	fmt.Println("lesson9 ", lesson9)
	fmt.Println("lesson9 string", lesson9.string)
	fmt.Println("lesson9 int", lesson9.int)
	fmt.Println("---------------------")

	lesson10 := Lesson5{
		name:   "Harry",
		target: "target",
		spend:  49,
	}
	lesson10.author = Author{
		name: "xxx",
		wx:   "wechat",
	}
	fmt.Println(lesson10)
	fmt.Println("---------------------")

	lesson11 := Lesson6{
		name:   "Harry",
		target: "target",
		spend:  49,
	}
	lesson11.Author = Author{
		name: "xxx",
		wx:   "wechat",
	}
	fmt.Println("lesson11 name:", lesson11.name)
	fmt.Println("lesson11 name:", lesson11.target)
	fmt.Println("lesson11 name:", lesson11.wx)
	fmt.Println("---------------------")

	lesson12 := Lesson{
		name:   "Harry",
		target: "target",
		spend:  49,
	}
	lesson13 := Lesson{
		name:   "Harry",
		target: "target",
		spend:  49,
	}
	fmt.Println(lesson12 == lesson13)
	fmt.Println(reflect.DeepEqual(lesson12, lesson13))
	fmt.Println("---------------------")

	lesson14 := Lesson{
		name:   "Harry",
		target: "target",
		spend:  49,
	}
	fmt.Println("调用AddTime方法前")
	lesson14.ShowLessonInfo()
	fmt.Println(lesson14.spend)
	lesson14.AddTime(8)
	fmt.Println("调用AddTime方法后")
	fmt.Println(lesson14.spend)
}
