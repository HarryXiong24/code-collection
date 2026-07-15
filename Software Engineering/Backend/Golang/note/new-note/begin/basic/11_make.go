package basic

import "fmt"

type floatMap map[string]float64

func (m floatMap) output() {
	fmt.Println(m)
}

func MakeDemo() {
	// use make to create a slice
	userNames := make([]string, 2, 5)
	// userNames := []string{}

	userNames[0] = "Julie"

	userNames = append(userNames, "Max")
	userNames = append(userNames, "Manuel")

	fmt.Println(userNames)

	// use make to create a map
	courseRatings := make(map[string]float64, 3) // reduce memory re-allocation

	courseRatings["go"] = 4.7
	courseRatings["react"] = 4.8
	courseRatings["angular"] = 4.7

	fmt.Println(courseRatings)

	// type alias
	courseRatings1 := make(floatMap, 3)

	courseRatings1["go"] = 4.7
	courseRatings1["react"] = 4.8
	courseRatings1["angular"] = 4.7

	courseRatings1.output()

	fmt.Println(courseRatings1)

	// for ... range

	for index, value := range userNames {
		fmt.Println("Index:", index)
		fmt.Println("Value:", value)
	}

	for key, value := range courseRatings {
		fmt.Println("Key:", key)
		fmt.Println("Value:", value)
	}
}
