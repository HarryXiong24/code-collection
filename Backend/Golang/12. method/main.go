package main

import "fmt"

func main() {
	/*
		func (t Type) methodName(parameterList) returnList{
			//逻辑执行体
		}
	*/
	lesson := Lesson{
		Name:      "Harry",
		Target:    "1",
		SpendTime: 1,
	}
	fmt.Println("before change")
	lesson.PrintInfo()
	fmt.Println("after change")
	lesson.AddSpendTime(2)
	lesson.ChangeLessonName("1")
	lesson.PrintInfo()
	fmt.Println("------------------")
	PrintInfo(lesson)
	lesson.PrintInfo()

	bPtr := &lesson
	bPtr.PrintInfo()

	// PrintInfo(bPtr) // err  无法将 'bPtr' (类型 *Lesson) 用作类型 Lesson

	fmt.Println("------------------")
	var x myInt = 50
	var y myInt = 7
	fmt.Println(x.add(y))
}

type myInt int

func (a myInt) add(b myInt) myInt {
	return a + b
}

type Lesson struct {
	Name      string // 课程名称
	Target    string // 学习目标
	SpendTime int    // 学习时间
}

type Author struct {
	Name string
}

func (author Author) PrintInfo() {
	fmt.Println("name:", author.Name)
}

// PrintInfo lesson 相当于 python中的self,java中的this
func (lesson Lesson) PrintInfo() {
	fmt.Println("name:", lesson.Name)
	fmt.Println("target", lesson.Target)
	fmt.Println("spendTime", lesson.SpendTime)
}

func (lesson Lesson) ChangeLessonName(name string) {
	lesson.Name = name
}

func (lesson *Lesson) AddSpendTime(n int) {
	lesson.SpendTime = lesson.SpendTime + n
}

func PrintInfo(lesson Lesson) {
	fmt.Println("name:", lesson.Name)
	fmt.Println("target", lesson.Target)
	fmt.Println("spendTime", lesson.SpendTime)
}
