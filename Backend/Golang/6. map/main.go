package main

import "fmt"

func createMap() {
	// make(map[keyType]ValueType)

	// 创建相同键值 map
	steps := make(map[string]string)
	fmt.Println(steps)

	// 创建不同键值 map
	scores := make(map[string]int)
	fmt.Println(scores)

	// 通过字面值创建 map
	var steps2 map[string]string = map[string]string{
		"第一步": "1",
		"第二步": "2",
		"第三步": "3",
	}
	fmt.Println(steps2)

	steps3 := map[string]string{
		"第一步": "1",
		"第二步": "2",
		"第三步": "3",
	}
	fmt.Println(steps3)

	// 添加元素到map
	steps3["第四步"] = "总监"
	fmt.Println(steps3)
	// 更新map
	steps3["第四步"] = "CTO"
	fmt.Println(steps3)
	// 获取元素
	fmt.Println(steps3["第四步"])

	// 删除map中的元素
	delete(steps3, "第四步")
	fmt.Println(steps3)

	// 判断键值是否存在  value,ok := map[key]
	v3, ok := steps3["第三步"]
	fmt.Println(ok)
	fmt.Println(v3)

	v4, ok := steps3["第四步"]
	fmt.Println(ok)
	fmt.Println(v4)

	// for range
	for key, value := range steps3 {
		fmt.Printf("key:%s,value:%s\n", key, value)
	}

	// len() 获取 map 长度
	fmt.Println(len(steps3))

}

func mapByReference() {
	steps4 := map[string]string{
		"第一步": "1",
		"第二步": "2",
		"第三步": "3",
	}
	fmt.Println(steps4)
	newSteps4 := steps4
	newSteps4["第一步"] = "4"
	newSteps4["第二步"] = "5"
	newSteps4["第三步"] = "6"
	fmt.Println(steps4)
	fmt.Println(newSteps4)
}

func main() {
	createMap()
	fmt.Println("---------")
	mapByReference()
}
