package main

import "fmt"

func createSlice() {
	// 切片[]Type，数组[n]Type
	// 方法1 声明整型切片
	var numberList []int
	fmt.Println(numberList)

	// 方法2 声明一个空切片
	var numberListEmpty = []int{}
	fmt.Println(numberListEmpty)

	// 方法3 make声明方式  make([]Type,size,cap)
	numList := make([]int, 3, 5)
	fmt.Println(numList)
	// 指针：是指向第一个切片元素对应的底层数组元素的地址。（切片的第一个元素不一定是数组中第一个元素）
	// 长度：切片中的元素个数。
	// 容量：从切片的开始位置到底层数据的结尾位置。

	arr := [5]string{"1", "2", "3", "4", "5"}
	var s1 = arr[1:4] // 数组变量[起始位置:结束位置]（切片中不包含结束位置的元素，也就是取值到结束位置-1）
	fmt.Println(arr)
	fmt.Println(s1)
}

func sliceLenAndCap() {
	s := make([]int, 3, 5)
	fmt.Println(len(s))
	fmt.Println(cap(s))
}

func outOfSlice() {
	s := make([]int, 3, 5)
	fmt.Println(s)
	// fmt.Println(s[10]) 会报错
}

func emptySlice() {
	var numberlist []int
	fmt.Println(numberlist == nil) //true

	fmt.Println(len(numberlist) == 0) //true 判断切片是否为空
}

func modifySlice() {
	var arr = [...]string{"1", "2", "3"}
	s := arr[:] // [0:len(arr)]
	fmt.Println(arr)
	fmt.Println(s)

	s[0] = "xx"
	fmt.Println(arr)
	fmt.Println(s)
}

func appendSliceData() {
	s := []string{"1"}
	fmt.Println(s)
	fmt.Println(cap(s))
	// 追加一个元素
	s = append(s, "2")
	fmt.Println(s)
	fmt.Println(cap(s))
	// 追加2个元素
	s = append(s, "3", "4")
	fmt.Println(s)
	fmt.Println(cap(s))
	// 追加一个切片
	s = append(s, []string{"xx", "yy"}...)
	fmt.Println(s)
	fmt.Println(cap(s))
}

func mSlice() {
	numList := [][]string{
		{"1", "11"},
		{"2", "22"},
		{"3", "33"},
	}
	fmt.Println(numList)
}

func main() {
	createSlice()
	fmt.Println("---------")
	sliceLenAndCap()
	fmt.Println("---------")
	outOfSlice()
	fmt.Println("---------")
	emptySlice()
	fmt.Println("---------")
	modifySlice()
	fmt.Println("---------")
	appendSliceData()
	fmt.Println("---------")
	mSlice()
}
